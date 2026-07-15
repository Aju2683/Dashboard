import { useState } from "react";
import avatar from "../assets/avatar.png";
import {
  Archive,
  Bell,
  Bold,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit2,
  Eye,
  File,
  Image,
  Inbox,
  Italic,
  Link,
  Mail,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  Smile,
  Star,
  Trash2,
  Underline,
  X,
} from "lucide-react";



const mailItems = [
  {
    id: 1,
    name: "Regina Cooper",
    email: "regina_cooper@gmail.com",
    subject: "Creative Director Resume",
    message:
      "The Arts play a large role in the expression of inner thoughts and beauty in my life...",
    time: "10:45",
    active: true,
    unread: true,
  },
  {
    id: 2,
    name: "Dustin Williamson",
    email: "dustin@gmail.com",
    subject: "Meeting with friends",
    message: "Hello, Mark! I am writing to introduce you to David Boyd...",
    time: "10:40",
    active: false,
    unread: false,
  },
  {
    id: 3,
    name: "Jane Wilson",
    email: "jane@gmail.com",
    subject: "UX Conference in New York",
    message: "We use the Arts as a means of touching that part of us that we cannot reach...",
    time: "09:15",
    active: false,
    unread: false,
  },
  {
    id: 4,
    name: "Brandon Pena",
    email: "brandon@gmail.com",
    subject: "Muzii's weekly design #236",
    message: "From dance and music to abstract art our concept of life is shown...",
    time: "09:01",
    active: false,
    unread: false,
  },
  {
    id: 5,
    name: "Jacob Hawkins",
    email: "jacob@gmail.com",
    subject: "Weekly project report",
    message: "From dance and music to abstract art our concept of life is shown through...",
    time: "08:20",
    active: false,
    unread: false,
  },
  {
    id: 6,
    name: "Shane Black",
    email: "shane@gmail.com",
    subject: "Order Status #24197118",
    message: "The arts teach us how to communicate through creative expression...",
    time: "08:10",
    active: false,
    unread: false,
  },
];

const labels = [
  { name: "Personal", color: "bg-teal-400" },
  { name: "Work", color: "bg-cyan-400" },
  { name: "Friends", color: "bg-green-400" },
  { name: "Family", color: "bg-yellow-400" },
  { name: "Social", color: "bg-emerald-500" },
];

function MailPage() {
  const [selectedMail, setSelectedMail] = useState(mailItems[0]);
  const [viewMode, setViewMode] = useState("detail");
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [showNewLabel, setShowNewLabel] = useState(false);
  const [showLabelMenu, setShowLabelMenu] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="grid min-h-[calc(100vh-64px)] grid-cols-[210px_330px_1fr]">
        <MailSidebar
          activeFolder={activeFolder}
          onNewMessage={() => setShowCompose(true)}
          onFolderClick={(folderName) => {
          setActiveFolder(folderName);
          setViewMode("list");
  }}
  onNewLabel={() => setShowNewLabel(true)}
  showLabelMenu={showLabelMenu}
  setShowLabelMenu={setShowLabelMenu}
/>

       {viewMode === "detail" ? (
     <MailList
    selectedMail={selectedMail}
    setSelectedMail={(mail) => {
      setSelectedMail(mail);
      setViewMode("detail");
    }}
  />
) : (
  <FullMailList
    activeFolder={activeFolder}
    setSelectedMail={(mail) => {
      setSelectedMail(mail);
      setViewMode("detail");
    }}
  />
)}

        {viewMode === "detail" && (
          <MailDetails
            mail={selectedMail}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
          />
        )}
      </div>

      {showNewLabel && <NewLabelPanel onClose={() => setShowNewLabel(false)} />}

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
}

function MailSidebar({
  activeFolder,
  onNewMessage,
  onFolderClick,
  onNewLabel,
  showLabelMenu,
  setShowLabelMenu,
}) {
  return (
    <aside className="border-r border-gray-100 bg-white px-6 py-5">
      <button
        type="button"
        onClick={onNewMessage}
        className="mb-6 w-full rounded-lg bg-[#199a42] py-3 text-[13px] font-bold uppercase text-white"
      >
        New Message
      </button>

      <div className="space-y-1">
        <MailMenuItem
          active={activeFolder === "Inbox"}
          icon={Inbox}
          label="Inbox"
          count="5"
          onClick={() => onFolderClick("Inbox")}
        />

        <MailMenuItem
          active={activeFolder === "Marked"}
          icon={Star}
          label="Marked"
          onClick={() => onFolderClick("Marked")}
        />

        <MailMenuItem
          active={activeFolder === "Drafts"}
          icon={Edit2}
          label="Drafts"
          onClick={() => onFolderClick("Drafts")}
        />

        <MailMenuItem
          active={activeFolder === "Sent"}
          icon={Send}
          label="Sent"
          onClick={() => onFolderClick("Sent")}
        />

        <MailMenuItem
          active={activeFolder === "Important"}
          icon={Bookmark}
          label="Important"
          count="4"
          onClick={() => onFolderClick("Important")}
        />

        <MailMenuItem
          active={activeFolder === "Deleted"}
          icon={Trash2}
          label="Deleted"
          onClick={() => onFolderClick("Deleted")}
        />
      </div>

      <div className="relative mt-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[12px] font-bold uppercase text-gray-400">
            Labels
          </p>

          <button
            type="button"
            onClick={onNewLabel}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="space-y-4">
          {labels.map((label, index) => (
            <button
              key={label.name}
              type="button"
              onClick={() => {
                onFolderClick(label.name);

                if (index === 0) {
                  setShowLabelMenu(!showLabelMenu);
                }
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-[13px] font-medium ${
                activeFolder === label.name
                  ? "bg-gray-50 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${label.color}`} />
              {label.name}
            </button>
          ))}
        </div>

        {showLabelMenu && <LabelMenu />}
      </div>
    </aside>
  );
}

function MailMenuItem({ icon: Icon, label, count, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-[13px] font-medium ${
        active ? "bg-gray-50 text-gray-800" : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon size={16} />
        {label}
      </span>

      {count && (
        <span className="rounded-full bg-red-400 px-2 py-0.5 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

function MailList({ selectedMail, setSelectedMail }) {
  return (
    <section className="border-r border-gray-100 bg-[#fafbfc]">
      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
        <div className="flex items-center gap-3">
          <Search size={17} className="text-gray-400" />
          <input
            placeholder="Search..."
            className="bg-transparent text-[13px] outline-none placeholder:text-gray-400"
          />
        </div>

        <button className="flex items-center gap-2 text-[12px] font-medium text-gray-500">
          Recent
          <ChevronDown size={14} />
        </button>
      </div>

      <div>
        {mailItems.map((mail) => (
          <button
            key={mail.id}
            type="button"
            onClick={() => setSelectedMail(mail)}
            className={`block w-full border-b border-gray-100 px-5 py-4 text-left ${
              selectedMail.id === mail.id ? "bg-white" : "bg-[#fafbfc]"
            }`}
          >
            <div className="flex items-start gap-3">
              <img
                src={avatar}
                alt={mail.name}
                className="h-10 w-10 rounded-full object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <p className="truncate text-[13px] font-semibold text-gray-600">
                    {mail.name}
                  </p>
                  <span className="text-[11px] text-gray-400">{mail.time}</span>
                </div>

                <h3 className="truncate text-[14px] font-bold text-gray-800">
                  {mail.subject}
                </h3>

                <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-gray-400">
                  {mail.message}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function MailDetails({ mail, showEmoji, setShowEmoji }) {
  return (
    <section className="bg-white">
      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-7">
        <button className="text-gray-500">
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-6 text-[13px] text-gray-500">
          <span>1 of 200</span>
          <ChevronRight size={15} />
        </div>

        <div className="flex items-center gap-5 text-gray-500">
          <Bookmark size={17} className="fill-red-400 text-red-400" />
          <Archive size={17} />
          <Trash2 size={17} />
        </div>
      </div>

      <div className="px-9 py-8">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <img
              src={avatar}
              alt={mail.name}
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <p className="text-[14px] font-bold text-gray-700">
                {mail.name}
              </p>
              <p className="text-[13px] font-medium text-[#199a42]">
                {mail.email}
              </p>
            </div>
          </div>

          <p className="text-[12px] font-medium text-gray-500">
            May 27, 2020 — {mail.time}
          </p>
        </div>

        <h1 className="mb-6 text-[30px] font-bold text-gray-800">
          {mail.subject}
        </h1>

        <div className="max-w-[720px] space-y-5 text-[14px] leading-7 text-gray-600">
          <p>Hello, Regina Cooper!</p>

          <p>
            I am writing to introduce you to David Boyd. I know you’ve been
            looking hard for a candidate for that Creative Director position and
            I believe David Boyd fits the position.
          </p>

          <p>
            David Boyd and I worked together at Apple company, where they were
            the senior Creative Director. They did a terrific job there. David
            Boyd was responsible for completely restructuring both the
            public-facing and internal websites.
          </p>

          <p>
            I’ve attached David Boyd resume and portfolio for your review. You
            can contact David Boyd at{" "}
            <span className="text-[#199a42]">regina_cooper@gmail.com</span>
          </p>

          <p>Thanks for any help you can give. 😊</p>

          <p>
            Best regards,
            <br />
            Regina Cooper
          </p>
        </div>

        <div className="mt-8 flex gap-5">
          <AttachmentCard title="Resume.pdf" size="570 KB" />
          <AttachmentCard title="Portfolio.zip" size="250 MB" />
        </div>

        <ReplyBox showEmoji={showEmoji} setShowEmoji={setShowEmoji} />
      </div>
    </section>
  );
}

function AttachmentCard({ title, size }) {
  return (
    <div className="flex w-[210px] items-center justify-between rounded-xl border border-gray-200 px-4 py-4">
      <div className="flex items-center gap-3">
        <File size={22} className="text-red-400" />
        <div>
          <p className="text-[12px] font-bold text-gray-700">{title}</p>
          <p className="text-[11px] text-gray-400">{size}</p>
        </div>
      </div>

      <Download size={15} className="text-gray-400" />
    </div>
  );
}

function ReplyBox({ showEmoji, setShowEmoji }) {
  return (
    <div className="relative mt-8 max-w-[720px] overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2 text-[12px] text-gray-500">
          To:
          <span className="rounded-md bg-gray-100 px-2 py-1">
            Regina Cooper ×
          </span>
        </div>

        <div className="flex gap-3 text-[12px] text-gray-400">
          <span>Cc</span>
          <span>Bcc</span>
        </div>
      </div>

      <Toolbar onEmoji={() => setShowEmoji(!showEmoji)} />

      <textarea
        placeholder="Type something"
        className="h-[120px] w-full resize-none px-4 py-3 text-[13px] outline-none placeholder:text-gray-400"
      />

      <div className="flex items-center gap-4 px-4 pb-4">
        <button className="flex items-center gap-3 rounded-lg bg-[#199a42] px-6 py-3 text-[13px] font-bold text-white">
          Send
          <Send size={14} />
        </button>

        <Paperclip size={17} className="text-gray-400" />
      </div>

      {showEmoji && <EmojiPopup />}
    </div>
  );
}

function Toolbar({ onEmoji }) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50 px-4 py-3 text-gray-500">
      <button className="text-[13px] font-bold">A</button>
      <Bold size={15} />
      <Italic size={15} />
      <Underline size={15} />
      <Link size={15} />
      <Paperclip size={15} />
      <Image size={15} />
      <button type="button" onClick={onEmoji}>
        <Smile size={15} />
      </button>
      <MoreHorizontal size={15} />
    </div>
  );
}

function EmojiPopup() {
  const emojis = [
    "😊",
    "😂",
    "😍",
    "😎",
    "😉",
    "😭",
    "😡",
    "😇",
    "😋",
    "🤩",
    "😴",
    "😱",
    "😜",
    "😌",
    "😃",
    "😆",
    "😅",
    "👍",
    "🔥",
    "❤️",
  ];

  return (
    <div className="absolute bottom-[100px] left-[150px] z-50 w-[260px] rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
      <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2">
        <Search size={14} className="text-gray-400" />
        <input
          placeholder="Search..."
          className="w-full bg-transparent text-[12px] outline-none"
        />
      </div>

      <p className="mb-2 text-[11px] font-bold uppercase text-gray-400">
        Popular
      </p>

      <div className="grid grid-cols-7 gap-2 text-[20px]">
        {emojis.map((emoji, index) => (
          <button key={`${emoji}-${index}`} className="rounded hover:bg-gray-100">
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

function NewLabelPanel({ onClose }) {
  const colors = [
    "bg-red-300",
    "bg-teal-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-cyan-300",
    "bg-green-400",
    "bg-lime-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-gray-400",
  ];

  return (
    <div className="fixed left-[230px] top-16 z-50 h-[calc(100vh-64px)] w-[360px] bg-white p-7 shadow-2xl">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-[26px] font-bold text-gray-800">New Label</h2>

        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
        >
          <X size={15} />
        </button>
      </div>

      <label className="mb-2 block text-[12px] font-medium text-gray-400">
        Name
      </label>
      <input
        defaultValue="Personal"
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] outline-none"
      />

      <p className="mb-3 mt-5 text-[12px] font-medium text-gray-400">Color</p>

      <div className="grid grid-cols-5 gap-4">
        {colors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            className={`flex h-7 w-7 items-center justify-center rounded-full ${color}`}
          >
            {index === 1 && <Check size={14} className="text-white" />}
          </button>
        ))}
      </div>

      <button className="mt-8 w-full rounded-xl bg-[#199a42] py-3 text-[14px] font-bold text-white">
        Create
      </button>
    </div>
  );
}

function LabelMenu() {
  const colors = [
    "bg-red-400",
    "bg-teal-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-cyan-400",
    "bg-green-500",
    "bg-lime-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-gray-300",
  ];

  return (
    <div className="absolute left-[105px] top-[20px] z-50 w-[180px] rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
        <Edit2 size={14} />
        Edit
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
        <Plus size={14} />
        Add Sublabel
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-red-400 hover:bg-red-50">
        <Trash2 size={14} />
        Delete Label
      </button>

      <div className="mt-3 grid grid-cols-5 gap-2 border-t border-gray-100 pt-3">
        {colors.map((color, index) => (
          <button key={`${color}-${index}`} className={`h-5 w-5 rounded-full ${color}`} />
        ))}
      </div>
    </div>
  );
}

function FullMailList({ activeFolder, setSelectedMail }) {
  const [selectedRows, setSelectedRows] = useState([2, 4, 5]);

  function toggleRow(id) {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const folderRows = {
    Inbox: mailItems,
    Marked: mailItems.filter((_, index) => index % 2 === 0),
    Drafts: mailItems.slice(0, 3),
    Sent: mailItems.slice(2, 6),
    Important: mailItems.filter((_, index) => index === 0 || index === 3),
    Deleted: mailItems.slice(4, 6),
    Personal: mailItems.slice(0, 4),
    Work: mailItems.slice(1, 5),
    Friends: mailItems.slice(2, 6),
    Family: mailItems.slice(0, 2),
    Social: mailItems.slice(3, 6),
  };

  const rows = folderRows[activeFolder] || mailItems;

  return (
    <section className="col-span-2 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-7">
        <div className="flex items-center gap-5 text-gray-500">
          <CheckBox checked={false} />
          <Archive size={16} />
          <Bell size={16} />
          <Trash2 size={16} />
          <Mail size={16} />
        </div>

        <div className="flex w-[350px] items-center gap-3 rounded-xl border border-gray-200 px-4 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder={`Search in ${activeFolder}...`}
            className="w-full bg-transparent text-[13px] outline-none"
          />
        </div>

        <div className="flex items-center gap-5 text-[12px] text-gray-500">
          <ChevronLeft size={15} />
          1 of 200
          <ChevronRight size={15} />
          <Settings size={16} />
        </div>
      </div>

      <div className="border-b border-gray-100 px-7 py-4">
        <h2 className="text-[22px] font-bold text-gray-800">{activeFolder}</h2>
      </div>

      <div>
        {rows.length === 0 ? (
          <div className="py-16 text-center text-[15px] font-medium text-gray-400">
            No mails found in {activeFolder}
          </div>
        ) : (
          rows.map((mail, index) => (
            <div
              key={`${activeFolder}-${mail.id}-${index}`}
              onClick={() => setSelectedMail(mail)}
              className="grid w-full cursor-pointer grid-cols-[40px_30px_30px_150px_1fr_70px] items-center border-b border-gray-100 px-6 py-3 text-left text-[13px] hover:bg-gray-50"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRow(index);
                }}
              >
                <CheckBox checked={selectedRows.includes(index)} />
              </div>

              <Star
                size={16}
                className={
                  activeFolder === "Marked" || index % 3 === 0
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />

              <Bookmark
                size={16}
                className={
                  activeFolder === "Important" || index % 4 === 0
                    ? "fill-red-400 text-red-400"
                    : "text-gray-300"
                }
              />

              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  alt={mail.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-700">{mail.name}</span>
              </div>

              <p className="truncate text-gray-500">
                <span className="font-bold text-gray-700">{mail.subject}</span>{" "}
                — {mail.message}
              </p>

              <span className="text-right text-gray-400">{mail.time}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function ComposeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/10 p-8">
      <div className="w-[560px] rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-7 py-5">
          <h2 className="text-[26px] font-bold text-gray-800">New Message</h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-7">
          <label className="mb-2 block text-[12px] font-medium text-gray-400">
            To
          </label>

          <div className="mb-4 rounded-xl border border-gray-200 px-4 py-3 text-[13px]">
            <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600">
              Regina Cooper ×
            </span>
          </div>

          <label className="mb-2 block text-[12px] font-medium text-gray-400">
            Subject
          </label>

          <input
            defaultValue="Order Status #24197118"
            className="mb-4 h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] outline-none"
          />

          <label className="mb-2 block text-[12px] font-medium text-gray-400">
            Message
          </label>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <Toolbar onEmoji={() => {}} />
            <textarea
              placeholder="Type something"
              className="h-[180px] w-full resize-none px-4 py-3 text-[13px] outline-none"
            />
          </div>

          <div className="mt-5 flex gap-4">
            <AttachmentCard title="Resume.pdf" size="570 KB" />
            <div className="flex w-[210px] items-center justify-between rounded-xl border border-gray-200 px-4 py-4">
              <div>
                <p className="text-[12px] font-bold text-gray-700">
                  Uploading file... 40%
                </p>
                <div className="mt-2 h-1.5 w-[120px] rounded-full bg-gray-200">
                  <div className="h-1.5 w-[55px] rounded-full bg-[#199a42]" />
                </div>
              </div>
              <X size={14} className="text-gray-400" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <button className="flex items-center gap-3 rounded-lg bg-[#199a42] px-6 py-3 text-[13px] font-bold text-white">
              Send
              <Send size={14} />
            </button>

            <Paperclip size={17} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckBox({ checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-4 w-4 items-center justify-center rounded border ${
        checked
          ? "border-[#199a42] bg-[#199a42] text-white"
          : "border-gray-200 bg-white"
      }`}
    >
      {checked && <Check size={11} strokeWidth={4} />}
    </button>
  );
}

export default MailPage;