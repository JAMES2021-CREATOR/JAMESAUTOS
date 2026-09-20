import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Search, Send, User } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Conversation {
  id: string;
  customer_id: string;
  admin_id: string | null;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminMessages = () => {
  const [adminId, setAdminId] = useState<string | null>(null);

  const [conversations, setConversations] = useState<
    Conversation[]
  >([]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [selectedConversation, setSelectedConversation] =
    useState<string | null>(null);

  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  // =====================================================
  // GET LOGGED-IN ADMIN
  // =====================================================

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error("AUTH ERROR:", error);
          setLoading(false);
          return;
        }

        if (!user) {
          console.error("NO LOGGED-IN USER");
          setLoading(false);
          return;
        }

        console.log("LOGGED IN USER:", user.id);

        setAdminId(user.id);
      } catch (error) {
        console.error("GET ADMIN ERROR:", error);
        setLoading(false);
      }
    };

    getAdmin();
  }, []);

  // =====================================================
  // LOAD CONVERSATIONS
  // =====================================================

  useEffect(() => {
    if (!adminId) {
      return;
    }

    const loadConversations = async () => {
      try {
        setLoading(true);

        console.log("ADMIN ID:", adminId);
        console.log("LOADING ADMIN CONVERSATIONS...");

        const { data, error } = await supabase
          .from("conversations")
          .select(
            "id, customer_id, admin_id, created_at, updated_at"
          )
          .eq("admin_id", adminId)
          .order("updated_at", {
            ascending: false,
          });

        if (error) {
          console.error(
            "CONVERSATIONS ERROR:",
            error
          );

          setConversations([]);
          return;
        }

        const conversationData =
          (data || []) as Conversation[];

        console.log(
          "CONVERSATIONS FOUND:",
          conversationData
        );

        setConversations(conversationData);

        if (conversationData.length > 0) {
          setSelectedConversation((current) => {
            if (
              current &&
              conversationData.some(
                (conversation) =>
                  conversation.id === current
              )
            ) {
              return current;
            }

            return conversationData[0].id;
          });
        } else {
          setSelectedConversation(null);
        }
      } catch (error) {
        console.error(
          "LOAD CONVERSATIONS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [adminId]);

  // =====================================================
  // LOAD MESSAGES
  // =====================================================

  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      try {
        setLoadingMessages(true);

        console.log(
          "LOADING MESSAGES FOR:",
          selectedConversation
        );

        const { data, error } = await supabase
          .from("messages")
          .select(
            "id, conversation_id, sender_id, message, is_read, created_at"
          )
          .eq(
            "conversation_id",
            selectedConversation
          )
          .order("created_at", {
            ascending: true,
          });

        if (error) {
          console.error(
            "MESSAGES ERROR:",
            error
          );

          setMessages([]);
          return;
        }

        console.log(
          "MESSAGES FOUND:",
          data
        );

        setMessages(
          (data || []) as Message[]
        );
      } catch (error) {
        console.error(
          "LOAD MESSAGES ERROR:",
          error
        );
      } finally {
        setLoadingMessages(false);
      }
    };

    loadMessages();
  }, [selectedConversation]);

  // =====================================================
  // REALTIME MESSAGES
  // =====================================================

  useEffect(() => {
    if (!selectedConversation) {
      return;
    }

    const channel = supabase
      .channel(
        `admin-messages-${selectedConversation}`
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage =
            payload.new as Message;

          if (
            newMessage.conversation_id !==
            selectedConversation
          ) {
            return;
          }

          setMessages((previous) => {
            const exists = previous.some(
              (message) =>
                message.id === newMessage.id
            );

            if (exists) {
              return previous;
            }

            return [
              ...previous,
              newMessage,
            ];
          });
        }
      )
      .subscribe((status) => {
        console.log(
          "REALTIME STATUS:",
          status
        );
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversation]);

  // =====================================================
  // SEND ADMIN MESSAGE
  // =====================================================

  const handleSendMessage = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const text = messageText.trim();

    if (!text) {
      return;
    }

    if (!adminId) {
      alert("Admin is not logged in.");
      return;
    }

    if (!selectedConversation) {
      alert("Please select a customer conversation.");
      return;
    }

    try {
      setSending(true);

      console.log("SENDING ADMIN MESSAGE");

      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: selectedConversation,
          sender_id: adminId,
          message: text,
          is_read: false,
        })
        .select(
          "id, conversation_id, sender_id, message, is_read, created_at"
        )
        .single();

      if (error) {
        console.error(
          "SEND MESSAGE ERROR:",
          error
        );

        alert(
          `Message failed: ${error.message}`
        );

        return;
      }

      console.log(
        "MESSAGE SENT:",
        data
      );

      if (data) {
        setMessages((previous) => {
          const exists = previous.some(
            (message) =>
              message.id === data.id
          );

          if (exists) {
            return previous;
          }

          return [
            ...previous,
            data as Message,
          ];
        });
      }

      // Update conversation timestamp
      const { error: conversationError } =
        await supabase
          .from("conversations")
          .update({
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            selectedConversation
          );

      if (conversationError) {
        console.error(
          "CONVERSATION UPDATE ERROR:",
          conversationError
        );
      }

      setMessageText("");
    } catch (error) {
      console.error(
        "SEND MESSAGE EXCEPTION:",
        error
      );

      alert(
        "Something went wrong while sending the message."
      );
    } finally {
      setSending(false);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredConversations =
    conversations.filter((conversation) =>
      conversation.customer_id
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#080d14] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

          <p className="mt-4 text-sm text-gray-500">
            Loading customer messages...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="space-y-8 text-white">

      {/* HEADER */}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Communication
        </p>

        <h1 className="mt-2 text-3xl font-black">
          Customer Messages
        </h1>

        <p className="mt-2 text-gray-400">
          Communicate directly with JamesAutos customers.
        </p>
      </div>

      {/* CHAT CONTAINER */}

      <div className="grid h-[650px] overflow-hidden rounded-2xl border border-white/10 bg-[#111720] lg:grid-cols-[320px_1fr]">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <aside className="flex min-h-0 flex-col border-r border-white/10">

          {/* SEARCH */}

          <div className="shrink-0 border-b border-white/10 p-5">

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#080d14] px-3">

              <Search
                size={18}
                className="text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search customer..."
                className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
              />

            </div>

          </div>

          {/* CONVERSATIONS */}

          <div className="min-h-0 flex-1 overflow-y-auto">

            {filteredConversations.length ===
            0 ? (
              <div className="p-8 text-center">

                <User
                  size={45}
                  className="mx-auto text-gray-700"
                />

                <p className="mt-4 text-sm text-gray-500">
                  No customer conversations.
                </p>

              </div>
            ) : (
              filteredConversations.map(
                (conversation) => {

                  const active =
                    selectedConversation ===
                    conversation.id;

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() =>
                        setSelectedConversation(
                          conversation.id
                        )
                      }
                      className={`w-full border-b border-white/5 p-5 text-left transition ${
                        active
                          ? "bg-yellow-500/10"
                          : "hover:bg-white/5"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-black">
                          <User size={19} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="font-semibold">
                            Customer
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-500">
                            {conversation.customer_id}
                          </p>

                        </div>

                        <span className="text-[10px] text-gray-600">
                          {formatTime(
                            conversation.updated_at
                          )}
                        </span>

                      </div>

                    </button>
                  );
                }
              )
            )}

          </div>

        </aside>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <section className="flex min-h-0 flex-col">

          {!selectedConversation ? (
            <div className="flex flex-1 items-center justify-center text-center">

              <div>

                <User
                  size={60}
                  className="mx-auto text-gray-700"
                />

                <h2 className="mt-4 text-xl font-bold">
                  Select a customer
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Select a conversation to start messaging.
                </p>

              </div>

            </div>
          ) : (
            <>
              {/* CHAT HEADER */}

              <div className="flex shrink-0 items-center gap-4 border-b border-white/10 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-500 text-black">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="font-bold">
                    Customer
                  </h2>

                  <p className="text-xs text-green-400">
                    Active conversation
                  </p>
                </div>

              </div>

              {/* MESSAGES */}

              <div className="min-h-0 flex-1 overflow-y-auto p-6">

                {loadingMessages ? (
                  <div className="flex h-full items-center justify-center">

                    <div className="text-center">

                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

                      <p className="mt-3 text-sm text-gray-500">
                        Loading messages...
                      </p>

                    </div>

                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center">

                    <p className="text-sm text-gray-500">
                      No messages yet.
                    </p>

                  </div>
                ) : (
                  <div className="space-y-5">

                    {messages.map((message) => {

                      const isAdmin =
                        message.sender_id ===
                        adminId;

                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isAdmin
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >

                          <div
                            className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                              isAdmin
                                ? "rounded-br-sm bg-yellow-500 text-black"
                                : "rounded-bl-sm bg-white/5 text-gray-300"
                            }`}
                          >

                            <p className="text-sm leading-6">
                              {message.message}
                            </p>

                            <p
                              className={`mt-2 text-[10px] ${
                                isAdmin
                                  ? "text-black/50"
                                  : "text-gray-600"
                              }`}
                            >
                              {formatTime(
                                message.created_at
                              )}
                            </p>

                          </div>

                        </div>
                      );
                    })}

                  </div>
                )}

              </div>

              {/* =================================================
                  SEND MESSAGE BOX
              ================================================= */}

              <form
                onSubmit={handleSendMessage}
                className="shrink-0 border-t border-white/10 bg-[#0b1017] p-5"
              >

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#080d14] p-2">

                  <input
                    type="text"
                    value={messageText}
                    onChange={(event) =>
                      setMessageText(
                        event.target.value
                      )
                    }
                    disabled={sending}
                    placeholder="Type your reply..."
                    className="h-12 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-gray-600 disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={
                      sending ||
                      !messageText.trim()
                    }
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500 text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send size={19} />
                  </button>

                </div>

              </form>
            </>
          )}

        </section>

      </div>
    </div>
  );
};
export default AdminMessages;