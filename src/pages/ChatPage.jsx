import { useState } from "react";
import avatar from "../assets/avatar.png";
import {
  Download,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Trash2,
} from "lucide-react";



const chats = [
  {
    id: 1,
    name: "Dustin Williamson",
    message: "Hello, Mark! I am writing to introduc...",
    online: true,
  },
  {
    id: 2,
    name: "Jane Wilson",
    message: "We use the Arts as a means of touc...",
    online: true,
    active: true,
    unread: true,
  },
  {
    id: 3,
    name: "Regina Cooper",
    message: "The Arts play a large role in the expr...",
    online: false,
  },
  {
    id: 4,
    name: "Brandon Pena",
    message: "The arts allow us to be as specific or...",
    online: true,
  },
  {
    id: 5,
    name: "Jacob Hawkins",
    message: "From dance and music to abstract...",
    online: false,
  },
  {
    id: 6,
    name: "Shane Black",
    message: "The arts teach us how to communic...",
    online: false,
  },
  {
    id: 7,
    name: "Priscilla Edwards",
    message: "Concept of life is shown through the...",
    online: true,
  },
  {
    id: 8,
    name: "Kristin Mccoy",
    message: "Inner thoughts and beauty in my life...",
    online: false,
  },
];

const teams = [
  {
    id: 1,
    name: "#Managers",
    message: "Hello, Mark! I am writing to introduc...",
    bg: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 2,
    name: "#Designers",
    message: "Hello. Can you drop the photos...",
    bg: "bg-teal-100 text-teal-600",
    unread: true,
  },
];

function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(chats[1]);
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (!message.trim()) return;
    setMessage("");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="grid min-h-[calc(100vh-64px)] grid-cols-[330px_1fr]">
        <ChatSidebar
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />

        <ChatWindow
          selectedChat={selectedChat}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

function ChatSidebar({ selectedChat, setSelectedChat }) {
  return (
    <aside className="border-r border-gray-100 bg-[#fafbfc]">
      <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-6">
        <Search size={17} className="text-gray-400" />
        <input
          placeholder="Search..."
          className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="border-b border-gray-100 py-5">
        <div className="mb-4 flex items-center justify-between px-6">
          <p className="text-[12px] font-bold uppercase text-gray-400">Teams</p>

          <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <Plus size={14} />
          </button>
        </div>

        <div>
          {teams.map((team) => (
            <button
              key={team.id}
              className="flex w-full items-center gap-4 px-6 py-3 text-left hover:bg-white"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold ${team.bg}`}
              >
                {team.name.charAt(1)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-gray-700">
                    {team.name}
                  </p>

                  {team.unread && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-[10px] font-bold text-white">
                      4
                    </span>
                  )}
                </div>

                <p className="truncate text-[12px] text-gray-400">
                  {team.message}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="py-5">
        <div className="mb-4 flex items-center justify-between px-6">
          <p className="text-[12px] font-bold uppercase text-gray-400">People</p>

          <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <Plus size={14} />
          </button>
        </div>

        <div>
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => setSelectedChat(chat)}
              className={`flex w-full items-center gap-4 px-6 py-3 text-left ${
                selectedChat.id === chat.id ? "bg-white" : "hover:bg-white"
              }`}
            >
              <div className="relative">
                <img
                  src={avatar}
                  alt={chat.name}
                  className="h-10 w-10 rounded-full object-cover"
                />

                {chat.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#199a42]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-[13px] font-bold text-gray-700">
                    {chat.name}
                  </p>

                  {chat.unread && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-[10px] font-bold text-white">
                      4
                    </span>
                  )}
                </div>

                <p className="truncate text-[12px] text-gray-400">
                  {chat.message}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function ChatWindow({ selectedChat, message, setMessage, sendMessage }) {
  return (
    <section className="flex min-h-[calc(100vh-64px)] flex-col bg-white">
      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatar}
              alt={selectedChat.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#199a42]" />
          </div>

          <div>
            <p className="text-[14px] font-bold text-gray-700">
              {selectedChat.name}
            </p>
            <p className="text-[12px] text-[#199a42]">online</p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-gray-500">
          <Plus size={17} />
          <MoreHorizontal size={20} />
        </div>
      </div>

      <div className="flex-1 space-y-7 overflow-y-auto px-10 py-8">
        <MessageRow
          left
          text="Hi Cody, any progress on the project? 😊"
          time="1 day ago"
        />

        <MessageRow
          text="Hi Jane! Yes, I just finished developing the “Chat” template."
          time="1 day ago"
        />

        <ImageMessage />

        <MessageRow
          left
          text="It looks amazing. 😄 The customer will be very satisfied."
          time="1 day ago"
        />

        <MessageRow
          text="Thank you, glad you liked it. Send me Styles Guide."
          time="1 day ago"
          withActions
        />

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-[12px] text-gray-400">Today</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <FileMessage />

        <MessageRow text="I'll see later" time="1 min ago" />
      </div>

      <div className="flex h-16 items-center gap-4 border-t border-gray-100 px-8">
        <Paperclip size={18} className="text-gray-400" />
        <Smile size={18} className="text-gray-400" />

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message here..."
          className="flex-1 text-[14px] outline-none placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={sendMessage}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#199a42] text-white"
        >
          <Send size={18} />
        </button>
      </div>
    </section>
  );
}

function MessageRow({ text, time, left, withActions }) {
  return (
    <div className={`flex ${left ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex max-w-[520px] items-end gap-4 ${
          left ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <img
          src={avatar}
          alt="avatar"
          className="h-9 w-9 rounded-full object-cover"
        />

        <div>
          <div
            className={`relative rounded-xl px-5 py-4 text-[14px] leading-6 ${
              left
                ? "bg-[#199a42] text-white"
                : "border border-gray-200 bg-white text-gray-700"
            }`}
          >
            {text}

            {withActions && (
              <div className="absolute -left-12 top-2 flex gap-3 text-gray-400">
                <Paperclip size={15} />
                <Trash2 size={15} />
              </div>
            )}
          </div>

          <p
            className={`mt-2 text-[11px] text-gray-400 ${
              left ? "text-left" : "text-right"
            }`}
          >
            {time}
          </p>
        </div>

        <MoreHorizontal size={17} className="text-gray-300" />
      </div>
    </div>
  );
}

function ImageMessage() {
  const images = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=80",
  ];

  return (
    <div className="flex justify-end">
      <div className="mr-14 flex items-center gap-3">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="shared"
            className="h-16 w-16 rounded-xl object-cover"
          />
        ))}

        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 text-[13px] font-bold text-[#199a42]">
          +3
        </div>
      </div>
    </div>
  );
}

function FileMessage() {
  return (
    <div className="flex justify-start">
      <div className="flex items-end gap-4">
        <img
          src={avatar}
          alt="avatar"
          className="h-9 w-9 rounded-full object-cover"
        />

        <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
          <div className="bg-green-50 px-5 py-4">
            <p className="text-[14px] font-bold text-gray-700">
              Brand Styles Guide.pdf
            </p>
            <p className="mt-1 text-[12px] text-[#199a42]">487 KB</p>
          </div>

          <button className="flex w-full items-center justify-between bg-[#199a42] px-5 py-3 text-[13px] font-bold text-white">
            Download
            <Download size={16} />
          </button>
        </div>

        <p className="text-[11px] text-gray-400">2 min ago</p>
      </div>
    </div>
  );
}

export default ChatPage;