import newBackgroundImage from "../assets/new-background.png";
import avatar from "../assets/avatar.png";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import refreshPhoto1 from "../assets/refresh-photo-1.png";
import refreshPhoto2 from "../assets/refresh-photo-2.png";
import refreshPhoto3 from "../assets/refresh-photo-3.png";



const taskColumns = [
  {
    id: "todo",
    title: "TODO",
    count: 8,
    tasks: [
      {
        id: 1,
        title: "Brand Logo Design",
        desc: "Make a redesign of the logo in corporate colors.",
        date: "Jun 17",
        lines: true,
        files: 2,
        comments: 5,
        members: 2,
      },
      {
        id: 2,
        title: "New Header Image",
        desc: "",
        date: "Jun 17",
        image: "orange",
        files: 1,
        comments: 3,
        members: 1,
      },
      {
        id: 3,
        title: "Wireframe for App",
        desc: "Make a wireframe for an app for a pre-presentation.",
        date: "Jun 17",
        lines: true,
        files: 0,
        comments: 1,
        members: 2,
      },
    ],
  },
  {
    id: "progress",
    title: "IN PROGRESS",
    count: 5,
    tasks: [
      {
        id: 4,
        title: "Updating Modules",
        desc: "Step-by-step update of modules.",
        date: "Jun 17",
        lines: true,
        progress: 50,
        files: 2,
        comments: 5,
        members: 2,
      },
      {
        id: 5,
        title: "Template Progress",
        desc: "Designing cool UI design templates.",
        date: "Jun 17",
        lines: true,
        progress: 75,
        checklist: [
          ["Inbox Template", true],
          ["Chat Template", true],
          ["Tasks Template", true],
          ["Projects Template", false],
        ],
        files: 2,
        comments: 5,
        members: 2,
      },
    ],
  },
  {
    id: "completed",
    title: "COMPLETED",
    count: 9,
    tasks: [
      {
        id: 6,
        title: "Refresh Photo Slider",
        desc: "",
        date: "Jun 17",
        gallery: true,
        files: 3,
        comments: 2,
        members: 2,
      },
      {
        id: 7,
        title: "Server Startup",
        desc: "Running the server in test mode and configuring.",
        date: "Jun 17",
        lines: true,
        files: 0,
        comments: 17,
        members: 2,
      },
      {
        id: 8,
        title: "New Background",
        desc: "",
        date: "Jun 17",
        image: "newBackground",
       files: 1,
       comments: 2,
       members: 1,
},
    ],
  },
];

function TaskPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f7f7f8] px-7 py-7">
      <div className="mb-8 flex items-center justify-between">
        <button className="flex items-center gap-2 text-[26px] font-bold text-gray-700">
          Design Plan
          <ChevronDown size={18} className="text-gray-400" />
        </button>

        <div className="flex items-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-600 shadow-sm ring-1 ring-black/5">
            <SlidersHorizontal size={18} />
          </button>

          <button className="flex items-center gap-3 rounded-xl bg-[#199a42] px-6 py-3 text-[15px] font-bold text-white shadow-sm">
            Add
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
              <ChevronDown size={15} />
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {taskColumns.map((column) => (
          <TaskColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}

function TaskColumn({ column }) {
  return (
    <div>
      <div className="mb-5 flex h-16 items-center justify-between rounded-2xl bg-[#199a42] px-5 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <h2 className="text-[16px] font-bold">{column.title}</h2>

          <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-white/25 px-1.5 text-[11px] font-bold">
            {column.count}
          </span>
        </div>

        <MoreHorizontal size={22} />
      </div>

      <div className="space-y-5">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#199a42] text-white shadow-sm">
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}

function TaskCard({ task }) {
  return (
    <div className="bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          {task.lines && (
            <div className="mb-4 flex gap-2">
              <span className="h-1 w-5 rounded-full bg-[#4cc9b8]" />
              <span className="h-1 w-5 rounded-full bg-[#199a42]" />
            </div>
          )}

          <h3 className="text-[15px] font-bold text-gray-700">{task.title}</h3>

          {task.desc && (
            <p className="mt-2 text-[13px] leading-5 text-gray-500">
              {task.desc}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500">
          <CalendarDays size={14} />
          {task.date}
        </div>
      </div>

      {task.image === "orange" && <OrangeImage />}
      {task.image === "newBackground" && <NewBackgroundImage />}
      {task.gallery && <GalleryImage />}

      {task.progress && (
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[12px] font-medium text-gray-500">
            <span>SUB-TASKS: 4</span>
            <span>{task.progress}%</span>
          </div>

          <div className="h-1.5 rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-[#199a42]"
              style={{ width: `${task.progress}%` }}
            />
          </div>

          <div className="mt-3 text-center text-gray-400">
            <ChevronDown size={16} className="mx-auto" />
          </div>
        </div>
      )}

      {task.checklist && (
        <div className="mt-4 space-y-2">
          {task.checklist.map(([label, done]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl bg-[#f7f8fa] px-4 py-2.5"
            >
              <span className="text-[13px] font-medium text-gray-500">
                {label}
              </span>

              {done ? (
                <CheckCircle2 size={18} className="text-[#199a42]" />
              ) : (
                <span className="h-4 w-4 rounded-full border border-gray-300" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[13px] font-medium text-gray-500">
          {task.files > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip size={15} />
              {task.files}
            </span>
          )}

          {task.comments > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare size={15} />
              {task.comments}
            </span>
          )}
        </div>

        <div className="flex -space-x-2">
          {Array.from({ length: task.members }).map((_, index) => (
            <img
              key={index}
              src={avatar}
              alt="member"
              className="h-7 w-7 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrangeImage() {
  return (
    <div className="mt-4 h-[150px] overflow-hidden rounded-xl bg-gradient-to-br from-[#ffd8b2] via-[#ff8b4a] to-[#631137]">
      <div className="relative h-full w-full">
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#561032] to-transparent" />
        <div className="absolute bottom-8 left-7 h-20 w-36 rotate-[-18deg] bg-[#ff6f35]" />
        <div className="absolute bottom-8 right-8 h-24 w-44 rotate-[18deg] bg-[#ff8b4a]" />

        <div className="absolute bottom-0 left-0 right-0 flex justify-around text-[#35112f]">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} className="text-xl">
              ♟
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlueImage() {
  return (
    <div className="mt-4 h-[150px] overflow-hidden rounded-xl bg-gradient-to-br from-[#8af0e1] via-[#4dbfd2] to-[#25294f]">
      <div className="relative h-full w-full">
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#25294f] to-transparent" />
        <div className="absolute bottom-8 left-6 h-20 w-36 rounded-t-full bg-[#45aac4]" />
        <div className="absolute bottom-12 right-10 h-24 w-44 rounded-t-full bg-[#61d6d1]" />

        <div className="absolute bottom-0 left-0 right-0 flex justify-around text-[#24355f]">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className="text-xl">
              ♟
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryImage() {
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      <img
        src={refreshPhoto1}
        alt="Refresh photo 1"
        className="h-[78px] w-full rounded-lg object-cover"
      />

      <img
        src={refreshPhoto2}
        alt="Refresh photo 2"
        className="h-[78px] w-full rounded-lg object-cover"
      />

      <img
        src={refreshPhoto3}
        alt="Refresh photo 3"
        className="h-[78px] w-full rounded-lg object-cover"
      />
    </div>
  );
}
function NewBackgroundImage() {
  return (
    <div className="mt-4 h-[150px] overflow-hidden rounded-xl">
      <img
        src={newBackgroundImage}
        alt="New Background"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default TaskPage;