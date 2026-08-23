import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Send, User } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface Conversation {
  id: string;
  customer_id: string;
  admin_id: string | null;
  created_at: string;
  updated_at: string;
}

const CustomerMessages = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const [conversation, setConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [messageText, setMessageText] = useState("");

  const [loading, setLoading] = useState(true);

  const [sending, setSending] = useState(false);

  const [creatingConversation, setCreatingConversation] =
    useState(false);

  // =====================================================
  // LOAD CUSTOMER + CONVERSATION + MESSAGES
  // =====================================================

  useEffect(() => {
    const loadCustomerMessages = async () => {
      try {
        setLoading(true);

        // Get logged in customer
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error(userError);
          return;
        }

        if (!user) {
          console.error("No logged in customer.");
          return;
        }

        setUserId(user.id);

        // =================================================
        // FIND CUSTOMER CONVERSATION
        // =================================================

        const {
          data: conversationData,
          error: conversationError,
        } = await supabase
          .from("conversations")
          .select(
            "id, customer_id, admin_id, created_at, updated_at"
          )
          .eq("customer_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

        if (conversationError) {
          console.error(
            "Conversation loading error:",
            conversationError
          );
          return;
        }

        let currentConversation = conversationData as
          | Conversation
          | null;

        // =================================================
        // CREATE CONVERSATION IF NONE EXISTS
        // =================================================

        if (!currentConversation) {
          setCreatingConversation(true);

          const {
            data: newConversation,
            error: createError,
          } = await supabase
            .from("conversations")
            .insert({
              customer_id: user.id,
              admin_id: null,
            })
            .select(
              "id, customer_id, admin_id, created_at, updated_at"
            )
            .single();

          if (createError) {
            console.error(
              "Conversation creation error:",
              createError
            );

            return;
          }

          currentConversation =
            newConversation as Conversation;

          setCreatingConversation(false);
        }

        setConversation(currentConversation);

        // =================================================
        // LOAD MESSAGES
        // =================================================

        const {
          data: messageData,
          error: messageError,
        } = await supabase
          .from("messages")
          .select(
            "id, conversation_id, sender_id, message, is_read, created_at"
          )
          .eq(
            "conversation_id",
            currentConversation.id
          )
          .order("created_at", {
            ascending: true,
          });

        if (messageError) {
          console.error(
            "Messages loading error:",
            messageError
          );

          return;
        }

        setMessages((messageData || []) as Message[]);
      } catch (error) {
        console.error(
          "Customer messages error:",
          error
        );
      } finally {
        setCreatingConversation(false);
        setLoading(false);
      }
    };

    loadCustomerMessages();
  }, []);

  // =====================================================
  // REALTIME MESSAGES
  // =====================================================

  useEffect(() => {
    if (!conversation) {
      return;
    }

    const channel = supabase
      .channel(
        `customer-messages-${conversation.id}`
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          const newMessage =
            payload.new as Message;

          setMessages((previous) => {
            const alreadyExists = previous.some(
              (message) =>
                message.id === newMessage.id
            );

            if (alreadyExists) {
              return previous;
            }

            return [...previous, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation]);

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSendMessage = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const text = messageText.trim();

    if (!text) {
      return;
    }

    if (!userId) {
      alert("You are not logged in.");
      return;
    }

    if (!conversation) {
      alert("No conversation available.");
      return;
    }

    try {
      setSending(true);

      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversation.id,
          sender_id: userId,
          message: text,
          is_read: false,
        })
        .select(
          "id, conversation_id, sender_id, message, is_read, created_at"
        )
        .single();

      if (error) {
        console.error(
          "Send message error:",
          error
        );

        alert(
          `Message could not be sent: ${error.message}`
        );

        return;
      }

      if (data) {
        setMessages((previous) => {
          const alreadyExists = previous.some(
            (message) => message.id === data.id
          );

          if (alreadyExists) {
            return previous;
          }

          return [...previous, data as Message];
        });
      }

      setMessageText("");

      // Update conversation timestamp
      await supabase
        .from("conversations")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversation.id);
    } catch (error) {
      console.error(
        "Message sending error:",
        error
      );

      alert(
        "Unable to send message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

          <p className="mt-4 text-sm text-gray-500">
            Loading messages...
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
          Messages
        </h1>

        <p className="mt-2 text-gray-400">
          Chat directly with JamesAutos.
        </p>
      </div>

      {/* CHAT */}

      <div className="flex min-h-[650px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111720]">

        {/* CHAT HEADER */}

        <div className="flex items-center gap-4 border-b border-white/10 p-5">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-black">
            <User size={20} />
          </div>

          <div>
            <h2 className="font-bold">
              JamesAutos Support
            </h2>

            <p className="text-xs text-green-400">
              Customer Support
            </p>
          </div>

        </div>

        {/* MESSAGES */}

        <div className="flex-1 space-y-5 overflow-y-auto p-6">

          {creatingConversation ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              Creating conversation...
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">

              <div>

                <User
                  size={55}
                  className="mx-auto text-gray-700"
                />

                <h3 className="mt-4 text-lg font-bold">
                  Start a conversation
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Send a message to JamesAutos.
                </p>

              </div>

            </div>
          ) : (
            messages.map((message) => {

              const isMine =
                message.sender_id === userId;

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                      isMine
                        ? "rounded-br-sm bg-yellow-500 text-black"
                        : "rounded-bl-sm bg-white/5 text-gray-300"
                    }`}
                  >

                    <p className="text-sm leading-6">
                      {message.message}
                    </p>

                    <p
                      className={`mt-2 text-[10px] ${
                        isMine
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
            })
          )}

        </div>

        {/* MESSAGE INPUT */}

        <form
          onSubmit={handleSendMessage}
          className="border-t border-white/10 bg-[#0b1017] p-5"
        >

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#080d14] p-2">

            <input
              type="text"
              value={messageText}
              onChange={(event) =>
                setMessageText(event.target.value)
              }
              placeholder="Type your message..."
              disabled={sending}
              className="h-12 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-gray-600"
            />

            <button
              type="submit"
              disabled={
                sending ||
                !messageText.trim() ||
                !conversation
              }
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500 text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
              title="Send message"
            >
              <Send size={19} />
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CustomerMessages;