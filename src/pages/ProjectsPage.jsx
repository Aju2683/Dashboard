import { useState } from "react";
import avatar from "../assets/avatar.png";
import {
  Check,
  ChevronDown,
  Clock,
  Download,
  Edit2,
  File,
  Filter,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";



const projects = [
  {
    id: 1,
    title: "App Development",
    client: "Dropbox, Inc.",
    icon: "💠",
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "1 week left",
    warning: false,
  },
  {
    id: 2,
    title: "Website Redesign",
    client: "GitLab Inc.",
    icon: "🦊",
    description: "It is necessary to develop a website redesign in corporate style.",
    progress: 75,
    status: "Started",
    deadline: "1 week left",
    warning: false,
  },
  {
    id: 3,
    title: "Landing Page",
    client: "Bitbucket, Inc.",
    icon: "🪣",
    description: "It is necessary to create a landing together with the development of design.",
    progress: 100,
    status: "Completed",
    deadline: "1 week left",
    warning: false,
  },
  {
    id: 4,
    title: "Parser Development",
    client: "Driveway, Inc.",
    icon: "🐍",
    description: "It is necessary to develop a ticket site parser in python.",
    progress: 50,
    status: "On Hold",
    deadline: "5 days left",
    warning: true,
  },
  {
    id: 5,
    title: "App Development",
    client: "Slack Technologies, Inc.",
    icon: "🌈",
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "5 days left",
    warning: true,
  },
  {
    id: 6,
    title: "App Development",
    client: "Google, Inc.",
    icon: "🔥",
    description: "Create a mobile application on iOS and Android devices.",
    progress: 25,
    status: "On Hold",
    deadline: "1 week left",
    warning: false,
  },
  {
    id: 7,
    title: "Admin Dashboard",
    client: "ArtTemplate, Inc.",
    icon: "🅰️",
    description: "Necessary to create Admin Dashboard on Angular 8.",
    progress: 30,
    status: "Started",
    deadline: "1 week left",
    warning: false,
  },
  {
    id: 8,
    title: "Web App on Vue.js",
    client: "ArtTemplate, Inc.",
    icon: "✅",
    description: "It is necessary to develop a web app on the framework Vue.js",
    progress: 100,
    status: "Completed",
    deadline: "1 week left",
    warning: false,
  },
  {
    id: 9,
    title: "App Development",
    client: "Facebook, Inc.",
    icon: "💬",
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "1 week left",
    warning: false,
  },
];

function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [detailsProject, setDetailsProject] = useState(null);

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.status === activeTab);

  if (detailsProject) {
    return (
      <ProjectDetailsPage
        project={detailsProject}
        onBack={() => setDetailsProject(null)}
      />
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-gray-800">Projects</h1>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm ring-1 ring-black/5"
          >
            <Filter size={18} />
          </button>

          <button
            type="button"
            onClick={() => setShowAddProject(true)}
            className="flex items-center gap-2 rounded-xl bg-[#199a42] px-5 py-3 text-[14px] font-bold text-white"
          >
            <Plus size={17} />
            Add Project
          </button>
        </div>
      </div>

      <div className="mb-7 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-8">
          <ProjectTab
            label="All"
            count="151"
            active={activeTab === "All"}
            onClick={() => setActiveTab("All")}
          />
          <ProjectTab
            label="Started"
            count="120"
            active={activeTab === "Started"}
            onClick={() => setActiveTab("Started")}
          />
          <ProjectTab
            label="On Hold"
            count="15"
            active={activeTab === "On Hold"}
            onClick={() => setActiveTab("On Hold")}
          />
          <ProjectTab
            label="Completed"
            count="8"
            active={activeTab === "Completed"}
            onClick={() => setActiveTab("Completed")}
          />
        </div>

        <div className="flex items-center gap-5 pb-4">
          <List size={18} className="text-gray-400" />
          <Grid2X2 size={18} className="text-[#199a42]" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-7">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
            onEdit={() => {
              setOpenMenuId(null);
              setEditProject(project);
            }}
            onOpenDetails={() => setDetailsProject(project)}
          />
        ))}
      </div>

      {showFilter && <FilterPanel onClose={() => setShowFilter(false)} />}

      {showAddProject && (
        <ProjectModal
          title="Add Project"
          mode="add"
          onClose={() => setShowAddProject(false)}
        />
      )}

      {editProject && (
        <ProjectModal
          title="Edit Project"
          mode="edit"
          project={editProject}
          onClose={() => setEditProject(null)}
        />
      )}
    </div>
  );
}

function ProjectCard({ project, openMenuId, setOpenMenuId, onEdit, onOpenDetails }) {
  return (
    <div
      onClick={onOpenDetails}
      className="relative cursor-pointer rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 hover:shadow-md"
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-[25px]">
            {project.icon}
          </div>

          <div>
            <h3 className="text-[17px] font-bold text-gray-800">
              {project.title}
            </h3>
            <p className="mt-1 text-[13px] text-gray-400">{project.client}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenuId(openMenuId === project.id ? null : project.id);
          }}
          className="text-gray-400"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <p className="mb-6 min-h-[42px] text-[13px] leading-5 text-gray-500">
        {project.description}
      </p>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-[12px] text-gray-500">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>

        <div className="h-1.5 rounded-full bg-gray-100">
          <div
            className="h-1.5 rounded-full bg-[#20c767]"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium ${
            project.warning
              ? "bg-orange-50 text-orange-500"
              : "bg-gray-50 text-gray-600"
          }`}
        >
          <Clock size={13} />
          {project.deadline}
        </span>

        <div className="flex -space-x-2">
          {[1, 2, 3].map((item) => (
            <img
              key={item}
              src={avatar}
              alt="member"
              className="h-8 w-8 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
      </div>

      {openMenuId === project.id && (
        <ProjectMenu onEdit={onEdit} />
      )}
    </div>
  );
}

function ProjectMenu({ onEdit }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-5 top-14 z-40 w-[175px] rounded-xl bg-white p-3 shadow-2xl ring-1 ring-black/5"
    >
      <button
        type="button"
        onClick={onEdit}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50"
      >
        <Edit2 size={14} />
        Edit
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50">
        <Plus size={14} />
        Add Member
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50">
        <Clock size={14} />
        Add Due Date
      </button>

      <button className="mt-2 flex w-full items-center gap-3 rounded-lg border-t border-gray-100 px-3 py-2 text-[13px] text-red-400 hover:bg-red-50">
        <Trash2 size={14} />
        Delete Project
      </button>
    </div>
  );
}

function FilterPanel({ onClose }) {
  return (
    <div className="fixed right-0 top-16 z-50 h-[calc(100vh-64px)] w-[360px] bg-white p-7 shadow-2xl">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-[26px] font-bold text-gray-800">Filter</h2>

        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
        >
          <X size={15} />
        </button>
      </div>

      <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
        <Search size={16} className="text-gray-400" />
        <input
          placeholder="Search Projects..."
          className="w-full bg-transparent text-[13px] outline-none"
        />
      </div>

      <FilterField label="Members" value="Shane Black" />
      <FilterField label="Due Date" value="Due anytime" />
      <FilterField label="Status" value="Completed" />

      <div className="mt-6 flex items-center gap-4">
        <button className="rounded-xl bg-[#199a42] px-6 py-3 text-[13px] font-bold text-white">
          Apply Filters
        </button>

        <button className="text-[13px] font-bold text-[#199a42]">
          Reset all Filters
        </button>
      </div>
    </div>
  );
}

function FilterField({ label, value }) {
  return (
    <div className="mt-5">
      <label className="mb-2 block text-[12px] font-medium text-gray-400">
        {label}
      </label>

      <div className="flex h-11 items-center justify-between rounded-xl border border-gray-200 px-4 text-[13px] text-gray-600">
        <span>{value}</span>
        <ChevronDown size={15} />
      </div>
    </div>
  );
}

function ProjectModal({ title, mode, project, onClose }) {
  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/25 pt-10">
      <div className="w-[430px] rounded-xl bg-white p-7 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[26px] font-bold text-gray-800">{title}</h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
          >
            <X size={15} />
          </button>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white text-[36px]">
            {isEdit ? project?.icon : <Plus size={30} className="text-gray-500" />}

            {isEdit && (
              <button className="absolute right-[-8px] top-[-8px] flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
                <Edit2 size={14} />
              </button>
            )}
          </div>
        </div>

        {isEdit && (
          <SelectBox label="Status" value={project?.status || "Started"} />
        )}

        <InputBox
          label="Project Name"
          value={project?.title || "App Development"}
        />

        <InputBox
          label="Client Name"
          value={project?.client || "Dropbox, Inc."}
        />

        <label className="mb-2 mt-4 block text-[12px] font-medium text-gray-400">
          Description
        </label>
        <textarea
          defaultValue={
            isEdit
              ? "You need to develop an application on something like React native, so that it is for Android and IOS. There are about 30 screens, the design and layout in the sketch is ready. The main pages are login, getting a task, a list of tasks, a map, a history of tasks, calling the camera to complete a task."
              : "Create a mobile application on iOS and Android devices."
          }
          className="h-[95px] w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[13px] text-gray-700 outline-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <DateBox label="Start Date" />
          <DateBox label="End Date" />
        </div>

        <InputBox label="Members" value={isEdit ? "Regina Cooper   Jane Wilson" : "Shane Black"} />
        <InputBox label="Budget" value="$     2.500.000" />

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#199a42] px-8 py-3 text-[13px] font-bold text-white"
          >
            {isEdit ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

function InputBox({ label, value }) {
  return (
    <div className="mt-4">
      <label className="mb-2 block text-[12px] font-medium text-gray-400">
        {label}
      </label>

      <input
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none"
      />
    </div>
  );
}

function SelectBox({ label, value }) {
  return (
    <div className="mt-4">
      <label className="mb-2 block text-[12px] font-medium text-gray-400">
        {label}
      </label>

      <select
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none"
      >
        <option>Started</option>
        <option>On Hold</option>
        <option>Completed</option>
      </select>
    </div>
  );
}

function DateBox({ label }) {
  return (
    <div className="mt-4">
      <label className="mb-2 block text-[12px] font-medium text-gray-400">
        {label}
      </label>

      <div className="flex h-11 rounded-xl border border-gray-200">
        <input
          defaultValue="00:00"
          className="w-1/2 border-r border-gray-200 px-3 text-[12px] outline-none"
        />
        <input
          defaultValue="12.07.2020"
          className="w-1/2 px-3 text-[12px] outline-none"
        />
      </div>
    </div>
  );
}

function ProjectDetailsPage({ project, onBack }) {
  const members = [
    "Jacob Hawkins",
    "Regina Cooper",
    "Jane Wilson",
    "Ronald Robertson",
    "Dustin Williamson",
    "Robert Edwards",
  ];

  const files = [
    "Wireframe UI Kit.zip",
    "Brand Styles Guide.pdf",
    "Rocket - Admin Dash...",
    "Picture 01.png",
    "Picture 02.png",
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="grid min-h-[calc(100vh-64px)] grid-cols-[260px_1fr_260px]">
        <aside className="border-r border-gray-100 bg-[#fafbfc]">
          <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-5">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search..."
              className="w-full bg-transparent text-[13px] outline-none"
            />
          </div>

          <div className="p-4">
            {projects.map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === project.id && onBack()}
                className="mb-3 w-full rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-[22px]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-gray-400">{item.client}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((n) => (
                      <img
                        key={n}
                        src={avatar}
                        alt="member"
                        className="h-7 w-7 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>

                  <span className="flex items-center gap-1 rounded-lg bg-gray-50 px-2 py-1 text-[11px] text-gray-500">
                    <Clock size={12} />
                    {item.deadline}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="px-8 py-7">
          <button
            onClick={onBack}
            className="mb-4 text-[13px] font-bold text-[#199a42]"
          >
            ← Back to Projects
          </button>

          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-[26px]">
                {project.icon}
              </div>

              <div>
                <h1 className="text-[22px] font-bold text-gray-800">
                  {project.title}
                </h1>
                <p className="mt-1 text-[13px] text-gray-400">
                  {project.client}
                </p>
              </div>
            </div>

            <MoreHorizontal className="text-gray-400" />
          </div>

          <div className="mb-7 grid grid-cols-3 gap-5">
            <DetailInfo title="Budget" value="2.500.000" icon="$" />
            <DetailInfo title="Start Date" value="17 Jun, 2020" icon="📅" />
            <DetailInfo title="End Date" value="04 Jul, 2020" icon="📅" />
          </div>

          <SectionTitle title="Description" />
          <p className="mb-7 text-[13px] leading-6 text-gray-500">
            You need to develop an application on something like React native, so
            that it is for Android and IOS. There are about 30 screens, the
            design and layout in the sketch is ready. The main pages are login,
            getting a task, a list of tasks, a map, a history of tasks, calling
            the camera to complete a task. The storage and processing server is
            on our side, there is a ready-made api for the web service that you
            will need to use.
          </p>

          <SectionTitle title="Checklist (50%)" />
          <div className="mb-4 h-1.5 rounded-full bg-gray-100">
            <div className="h-1.5 w-1/2 rounded-full bg-[#199a42]" />
          </div>

          <div className="mb-6 space-y-3">
            {[
              ["Create wireframes", true],
              ["Hi-Fi design development", true],
              ["Layout design", true],
              ["Functional programming", false],
              ["Testing for possible errors", false],
              ["Final debugging applications", false],
            ].map(([text, done]) => (
              <div
                key={text}
                className="flex items-center gap-3 text-[13px] text-gray-600"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    done
                      ? "border-[#199a42] text-[#199a42]"
                      : "border-gray-300"
                  }`}
                >
                  {done && <Check size={10} />}
                </span>
                <span className={done ? "line-through" : ""}>{text}</span>
              </div>
            ))}
          </div>

          <button className="mb-7 text-[13px] font-bold text-[#199a42]">
            + Add Checklist Item
          </button>

          <SectionTitle title="Comments" />
          <div className="mb-5 rounded-xl border border-gray-200 p-4">
            <input
              placeholder="Add Comment..."
              className="mb-4 w-full text-[13px] outline-none"
            />
            <button className="rounded-lg bg-[#199a42] px-5 py-2 text-[12px] font-bold text-white">
              Comment
            </button>
          </div>

          <Comment name="Jane Wilson" text="Hi Cody, any progress on the project? 😊" />
          <Comment name="Jacob Hawkins" text="Hi Jane! Yes, I just finished developing the ‘Chat’ template." />
          <Comment name="Regina Cooper" text="Hi Jacob. Will you be able to finish the last item of the task by tomorrow?" />
        </main>

        <aside className="border-l border-gray-100 bg-white p-6">
          <select className="mb-7 h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] outline-none">
            <option>Started</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>

          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[13px] font-bold uppercase text-gray-500">
                Members
              </h3>
              <Plus size={15} className="text-gray-400" />
            </div>

            <div className="space-y-4">
              {members.map((member) => (
                <div key={member} className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={member}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[13px] font-bold text-gray-700">
                      {member}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Project Manager
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[13px] font-bold uppercase text-gray-500">
                Files
              </h3>
              <Plus size={15} className="text-gray-400" />
            </div>

            <div className="space-y-4">
              {files.map((file) => (
                <div key={file} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File size={18} className="text-gray-400" />
                    <div>
                      <p className="text-[12px] font-bold text-gray-700">
                        {file}
                      </p>
                      <p className="text-[11px] text-gray-400">5.8 MB</p>
                    </div>
                  </div>
                  <Download size={14} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DetailInfo({ title, value, icon }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="mb-2 text-[12px] text-gray-400">{title}</p>
      <div className="flex items-center gap-2 text-[14px] font-bold text-gray-700">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100 text-[#199a42]">
          {icon}
        </span>
        {value}
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <h3 className="mb-3 text-[13px] font-bold uppercase text-gray-500">
      {title}
    </h3>
  );
}

function Comment({ name, text }) {
  return (
    <div className="mb-4 flex gap-3">
      <img src={avatar} alt={name} className="h-8 w-8 rounded-full object-cover" />
      <div>
        <p className="text-[13px] font-bold text-gray-700">{name}</p>
        <p className="text-[12px] text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function ProjectTab({ label, count, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-4 text-[14px] font-medium ${
        active ? "text-gray-800" : "text-gray-400"
      }`}
    >
      {label}
      <span className="ml-2 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-400">
        {count}
      </span>
      {active && (
        <span className="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-full bg-[#199a42]" />
      )}
    </button>
  );
}

export default ProjectsPage;