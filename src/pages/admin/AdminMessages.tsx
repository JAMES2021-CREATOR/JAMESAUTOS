import { Send, Search, User } from "lucide-react";
const AdminMessages = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Communication
        </p>

        <h1 className="mt-2 text-3xl font-black">Customer Messages</h1>

        <p className="mt-2 text-gray-400">
          Communicate directly with JamesAutos customers.
        </p>
      </div>

      {/* Chat Layout */}
      <div className="grid min-h-[650px] overflow-hidden rounded-2xl border border-white/10 bg-[#111720] lg:grid-cols-[320px_1fr]">
        {/* Conversations */}
        <aside className="border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="border-b border-white/10 p-5">
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#080d14] px-3">
              <Search size={18} className="text-gray-500" />

              <input
                type="text"
                placeholder="Search messages..."
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Conversation */}
          <button
            type="button"
            className="w-full border-b border-white/5 bg-yellow-500/10 p-5 text-left transition hover:bg-yellow-500/15"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-black">
                <User size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <p className="truncate font-semibold">Customer</p>

                  <span className="text-[10px] text-gray-500">10:42 AM</span>
                </div>

                <p className="mt-1 truncate text-sm text-gray-500">
                  I'm interested in the BMW 5 Series...
                </p>
              </div>
            </div>
          </button>
        </aside>

        {/* Chat */}
        <section className="flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center gap-4 border-b border-white/10 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-500 text-black">
              <User size={19} />
            </div>

            <div>
              <h2 className="font-bold">Customer</h2>

              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-white/5 px-5 py-3">
                <p className="text-sm leading-6 text-gray-300">
                  Hello, I'm interested in the BMW 5 Series. Is it still
                  available?
                </p>

                <p className="mt-2 text-[10px] text-gray-600">10:40 AM</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-yellow-500 px-5 py-3 text-black">
                <p className="text-sm leading-6">
                  Hello! Yes, the BMW 5 Series is currently available.
                </p>

                <p className="mt-2 text-[10px] text-black/50">10:42 AM</p>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-white/10 p-5">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#080d14] p-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="h-11 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-gray-600"
              />

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-500 text-black transition hover:bg-yellow-400"
                title="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminMessages;
