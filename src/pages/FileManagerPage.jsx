import { useState } from "react";
import avatar from "../assets/avatar.png";
import {
  Check,
  ChevronRight,
  Download,
  File,
  FileArchive,
  FileImage,
  FileText,
  Folder,
  FolderOpen,
  Grid2X2,
  Link,
  List,
  MoreVertical,
  Plus,
  Search,
  Share2,
  Trash2,
  Upload,
  X,
} from "lucide-react";



const folders = [
  { id: 1, name: "Design", size: "5.8 GB", icon: "folder" },
  { id: 2, name: "Projects", size: "3.2 GB", icon: "folder" },
  { id: 3, name: "Music", size: "1.5 GB", icon: "music" },
  { id: 4, name: "Pictures", size: "1.7 GB", icon: "image" },
  { id: 5, name: "Documents", size: "440 MB", icon: "document" },
  { id: 6, name: "Downloads", size: "10.1 GB", icon: "download" },
];

const files = [
  {
    id: 1,
    name: "Rocket - Admin...",
    fullName: "Rocket – Admin Dashboard & UI Kit.fig",
    size: "1.8 MB",
    type: "figma",
  },
  {
    id: 2,
    name: "Rocket - Admin...",
    fullName: "Rocket – Admin Dashboard & UI Kit.sketch",
    size: "1.5 MB",
    type: "sketch",
  },
  {
    id: 3,
    name: "Arion - Admin...",
    fullName: "Arion – Admin Dashboard & UI Kit.sketch",
    size: "1.2 MB",
    type: "sketch",
  },
  {
    id: 4,
    name: "Project Brief",
    fullName: "Project Brief",
    size: "1.4 MB",
    type: "word",
  },
  {
    id: 5,
    name: "Design",
    fullName: "Design",
    size: "1.9 GB",
    type: "zip",
  },
  {
    id: 6,
    name: "vCard – Resume...",
    fullName: "vCard – Resume.psd",
    size: "2.5 MB",
    type: "ps",
  },
  {
    id: 7,
    name: "Project Brief",
    fullName: "Project Brief",
    size: "1.2 MB",
    type: "word",
  },
  {
    id: 8,
    name: "Brand Styles Guide",
    fullName: "Brand Styles Guide",
    size: "4.5 MB",
    type: "pdf",
  },
];

function FileManagerPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItem, setSelectedItem] = useState({
    name: "Projects",
    size: "3.2 GB",
    type: "Folder",
  });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedRows, setSelectedRows] = useState([2]);

  function toggleRow(id) {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="grid min-h-[calc(100vh-64px)] grid-cols-[250px_1fr_270px]">
        <FileSidebar />

        <main className="relative border-r border-gray-100 bg-white px-8 py-7">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex w-[520px] items-center gap-3 rounded-xl bg-[#f7f8fa] px-4 py-3">
              <Search size={17} className="text-gray-400" />
              <input
                placeholder="Search..."
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 rounded-xl bg-[#199a42] px-5 py-3 text-[13px] font-bold text-white"
            >
              <Upload size={16} />
              Upload
            </button>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-[26px] font-bold text-gray-800">
              {viewMode === "grid" ? "Folders" : "File Manager"}
            </h1>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "text-[#199a42]" : "text-gray-400"}
              >
                <List size={19} />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "text-[#199a42]" : "text-gray-400"}
              >
                <Grid2X2 size={18} />
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <GridView
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          ) : (
            <ListView
              selectedRows={selectedRows}
              toggleRow={toggleRow}
              setSelectedItem={setSelectedItem}
            />
          )}

          {showUpload && <UploadPanel onClose={() => setShowUpload(false)} />}
        </main>

        <InfoPanel selectedItem={selectedItem} />
      </div>
    </div>
  );
}

function FileSidebar() {
  return (
    <aside className="border-r border-gray-100 bg-white">
      <div className="px-6 py-7">
        <p className="mb-5 text-[12px] font-bold uppercase text-gray-400">
          Folders
        </p>

        <div className="space-y-2">
          <SideFolder name="Design" />
          <SideFolder name="Projects" active open />

          <div className="ml-6 border-l border-dashed border-gray-300 pl-5">
            <SideSubFolder name="Projects_01" />
            <SideSubFolder name="Projects_02" />
            <SideSubFolder name="Projects_03" />
            <SideSubFolder name="Projects_04" />
          </div>

          <SideFolder name="Music" />
          <SideFolder name="Pictures" />
          <SideFolder name="Documents" />
          <SideFolder name="Downloads" />
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 py-5">
        <button className="flex items-center gap-3 text-[13px] text-gray-500">
          <Trash2 size={15} />
          Trash
        </button>
      </div>

      <div className="absolute bottom-7 w-[250px] px-6">
        <div className="mb-2 flex justify-between text-[12px] text-gray-500">
          <span>Storage</span>
          <span>70%</span>
        </div>

        <div className="h-1.5 rounded-full bg-gray-100">
          <div className="h-1.5 w-[70%] rounded-full bg-[#20c767]" />
        </div>
      </div>
    </aside>
  );
}

function SideFolder({ name, active, open }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-[13px] font-medium ${
        active ? "bg-gray-50 text-gray-800" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <span className="flex items-center gap-3">
        <Folder size={18} className="fill-[#ffd08a] text-[#ffd08a]" />
        {name}
      </span>

      <ChevronRight
        size={14}
        className={`text-gray-400 ${open ? "rotate-90" : ""}`}
      />
    </button>
  );
}

function SideSubFolder({ name }) {
  return (
    <button className="flex w-full items-center gap-3 py-3 text-[13px] text-gray-500">
      <Folder size={16} className="fill-[#ffd08a] text-[#ffd08a]" />
      {name}
    </button>
  );
}

function GridView({ selectedItem, setSelectedItem, openMenuId, setOpenMenuId }) {
  return (
    <>
      <div className="mb-10 grid grid-cols-4 gap-7">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() =>
              setSelectedItem({
                name: folder.name,
                size: folder.size,
                type: "Folder",
              })
            }
            className={`relative cursor-pointer rounded-2xl p-5 text-center ${
              selectedItem.name === folder.name ? "bg-gray-50" : "hover:bg-gray-50"
            }`}
          >
            <FolderIcon />

            <p className="mt-3 text-[14px] font-bold text-gray-700">
              {folder.name}
            </p>
            <p className="text-[11px] text-gray-400">{folder.size}</p>

            {selectedItem.name === folder.name && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === folder.id ? null : folder.id);
                }}
                className="absolute right-4 top-4 text-gray-400"
              >
                <MoreVertical size={17} />
              </button>
            )}

            {openMenuId === folder.id && <FolderMenu />}
          </div>
        ))}

        <button className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 text-gray-500">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
            <Plus size={17} />
          </span>
          <span className="text-[13px] font-medium">Add Folder</span>
        </button>
      </div>

      <h2 className="mb-6 text-[26px] font-bold text-gray-800">Files</h2>

      <div className="grid grid-cols-4 gap-8">
        {files.map((fileItem) => (
          <button
            key={fileItem.id}
            onClick={() =>
              setSelectedItem({
                name: fileItem.fullName,
                size: fileItem.size,
                type: "File",
              })
            }
            className="text-center"
          >
            <FileIcon type={fileItem.type} />

            <p className="mt-3 truncate text-[13px] font-medium text-gray-700">
              {fileItem.name}
            </p>

            <p className="text-[11px] text-gray-400">{fileItem.size}</p>
          </button>
        ))}
      </div>
    </>
  );
}

function ListView({ selectedRows, toggleRow, setSelectedItem }) {
  const rows = [
    ...folders.map((folder) => ({ ...folder, rowType: "folder" })),
    ...files.map((file) => ({ ...file, rowType: "file", name: file.fullName })),
  ];

  return (
    <div>
      {rows.map((row) => (
        <div
          key={`${row.rowType}-${row.id}`}
          onClick={() =>
            setSelectedItem({
              name: row.name,
              size: row.size,
              type: row.rowType === "folder" ? "Folder" : "File",
            })
          }
          className="grid cursor-pointer grid-cols-[45px_1fr_120px_110px_70px_35px] items-center border-b border-gray-100 py-4 text-[13px] hover:bg-gray-50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleRow(row.id);
            }}
          >
            <CheckBox checked={selectedRows.includes(row.id)} />
          </div>

          <div className="flex items-center gap-4">
            {row.rowType === "folder" ? (
              <Folder size={23} className="fill-[#ffd08a] text-[#ffd08a]" />
            ) : (
              <SmallFileIcon type={row.type} />
            )}

            <span className="font-medium text-gray-700">{row.name}</span>
          </div>

          <span className="text-gray-400">12.09.20</span>
          <span className="text-gray-400">{row.size}</span>

          <img
            src={avatar}
            alt="owner"
            className="h-8 w-8 rounded-full object-cover"
          />

          <MoreVertical size={17} className="text-gray-400" />
        </div>
      ))}
    </div>
  );
}

function FolderIcon() {
  return (
    <div className="mx-auto flex h-[76px] w-[92px] items-center justify-center rounded-xl bg-[#ffd08a]">
      <FolderOpen size={52} className="fill-[#ffd08a] text-[#ffd08a]" />
    </div>
  );
}

function FileIcon({ type }) {
  const details = {
    figma: { icon: "F", color: "text-pink-500" },
    sketch: { icon: "◆", color: "text-yellow-500" },
    word: { icon: "W", color: "text-green-600" },
    zip: { icon: "ZIP", color: "text-gray-500" },
    ps: { icon: "Ps", color: "text-blue-500" },
    pdf: { icon: "PDF", color: "text-red-500" },
  };

  const item = details[type] || details.pdf;

  return (
    <div className="mx-auto flex h-[70px] w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white text-[18px] font-bold">
      <span className={item.color}>{item.icon}</span>
    </div>
  );
}

function SmallFileIcon({ type }) {
  if (type === "word") return <FileText size={20} className="text-green-600" />;
  if (type === "pdf") return <FileText size={20} className="text-red-500" />;
  if (type === "zip") return <FileArchive size={20} className="text-gray-500" />;
  if (type === "figma") return <FileImage size={20} className="text-pink-500" />;
  return <File size={20} className="text-yellow-500" />;
}

function CheckBox({ checked }) {
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded border ${
        checked
          ? "border-[#199a42] bg-[#199a42] text-white"
          : "border-gray-200 bg-white"
      }`}
    >
      {checked && <Check size={11} strokeWidth={4} />}
    </span>
  );
}

function FolderMenu() {
  return (
    <div className="absolute right-[-75px] top-[65px] z-40 w-[180px] rounded-xl bg-white p-3 text-left shadow-2xl ring-1 ring-black/5">
      <MenuItem icon={Share2} label="Share" />
      <MenuItem icon={Link} label="Sharing Link" />
      <MenuItem icon={Download} label="Download" />
      <MenuItem icon={FileText} label="Rename" />
      <MenuItem icon={File} label="Copy" />
      <MenuItem icon={Folder} label="Move" />
      <div className="mt-2 border-t border-gray-100 pt-2">
        <MenuItem icon={Trash2} label="Delete" danger />
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label, danger }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] hover:bg-gray-50 ${
        danger ? "text-red-400" : "text-gray-600"
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function InfoPanel({ selectedItem }) {
  const [fileSharing, setFileSharing] = useState(true);
  const [backup, setBackup] = useState(false);
  const [sync, setSync] = useState(false);

  return (
    <aside className="bg-white px-8 py-8">
      <div className="mb-8 text-center">
        <FolderIcon />

        <h2 className="mt-4 text-[22px] font-bold text-gray-800">
          {selectedItem.name}
        </h2>
      </div>

      <h3 className="mb-4 text-[12px] font-bold uppercase text-gray-500">
        Info
      </h3>

      <InfoRow label="Type" value={selectedItem.type} />
      <InfoRow label="Size" value={selectedItem.size} />
      <InfoRow label="Owner" value="ArtTemplate" />
      <InfoRow label="Location" value="My Files" green />
      <InfoRow label="Modified" value="Sep 17, 2020 4:25" />
      <InfoRow label="Created" value="Sep 10, 2020 2:25" />

      <h3 className="mb-4 mt-8 text-[12px] font-bold uppercase text-gray-500">
        Settings
      </h3>

      <ToggleRow label="File Sharing" value={fileSharing} setValue={setFileSharing} />
      <ToggleRow label="Backup" value={backup} setValue={setBackup} />
      <ToggleRow label="Sync" value={sync} setValue={setSync} />
    </aside>
  );
}

function InfoRow({ label, value, green }) {
  return (
    <div className="mb-4 flex justify-between text-[13px]">
      <span className="text-gray-400">{label}</span>
      <span className={green ? "font-medium text-[#199a42]" : "text-gray-600"}>
        {value}
      </span>
    </div>
  );
}

function ToggleRow({ label, value, setValue }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="text-[13px] text-gray-600">{label}</span>

      <button
        type="button"
        onClick={() => setValue(!value)}
        className={`relative h-6 w-11 rounded-full ${
          value ? "bg-[#199a42]" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            value ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function UploadPanel({ onClose }) {
  const uploadFiles = [
    { name: "Rocket – Admin Dashboard & UI Kit.fig", size: "1.8 MB", done: true },
    { name: "Rocket – Admin Dashboard & UI Kit.sketch", size: "1.5 MB", done: true },
    { name: "Arion – Admin Dashboard & UI Kit.sketch", size: "1.2 MB", done: true },
    { name: "Project Brief.docx", size: "Upload Failed", failed: true },
    { name: "Design.zip", size: "1.8 MB", progress: "95%" },
    { name: "vCard – Resume.psd", size: "2.5 MB", progress: "75%" },
    { name: "Brand Styles Guide.pdf", size: "4.5 MB", progress: "50%" },
  ];

  return (
    <div className="absolute bottom-8 right-[-230px] z-50 w-[420px] rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-gray-800">
            Uploading 8 files
          </h2>
          <p className="mt-1 text-[13px] font-bold text-[#199a42]">
            98% <span className="font-medium text-gray-400">• 2 minutes left</span>
          </p>
        </div>

        <button onClick={onClose} className="text-gray-400">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {uploadFiles.map((fileItem) => (
          <div key={fileItem.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SmallFileIcon type={getFileType(fileItem.name)} />

              <div>
                <p className="text-[13px] font-medium text-gray-700">
                  {fileItem.name}
                </p>
                <p
                  className={`text-[12px] ${
                    fileItem.failed ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {fileItem.size}
                </p>
              </div>
            </div>

            {fileItem.done && <Check size={17} className="text-[#199a42]" />}

            {fileItem.failed && (
              <span className="h-4 w-4 rounded-full border-2 border-gray-300" />
            )}

            {fileItem.progress && (
              <span className="text-[13px] font-bold text-[#199a42]">
                {fileItem.progress}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getFileType(name) {
  if (name.includes(".fig")) return "figma";
  if (name.includes(".sketch")) return "sketch";
  if (name.includes(".docx")) return "word";
  if (name.includes(".zip")) return "zip";
  if (name.includes(".psd")) return "ps";
  if (name.includes(".pdf")) return "pdf";
  return "pdf";
}

export default FileManagerPage;