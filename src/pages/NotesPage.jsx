import { useState } from "react";

import {
  CalendarDays,
  Edit2,
  MoreHorizontal,
  Pin,
  Plus,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";

const initialNotes = [
  {
    id: 1,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: true,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
  {
    id: 2,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: true,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
  {
    id: 3,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: true,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
  {
    id: 4,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: false,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
  {
    id: 5,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: false,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
  {
    id: 6,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: false,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
  {
    id: 7,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: false,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
  {
    id: 8,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: false,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
  {
    id: 9,
    title: "The title of a note",
    date: "12 June, 2020",
    pinned: false,
    color: "bg-yellow-400",
    text:
      "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
  },
];

function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showAddNote, setShowAddNote] = useState(false);

  function addNote(newNote) {
    setNotes((prev) => [
      {
        id: Date.now(),
        title: newNote.title,
        text: newNote.text,
        date: "12 June, 2020",
        pinned: false,
        color: "bg-yellow-400",
      },
      ...prev,
    ]);

    setShowAddNote(false);
  }

  function deleteNote(noteId) {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
    setSelectedNote(null);
  }

  function togglePin(noteId) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      )
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-gray-800">Notes</h1>

        <div className="flex items-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm ring-1 ring-black/5">
            <SlidersHorizontal size={18} />
          </button>

          <button
            type="button"
            onClick={() => setShowAddNote(true)}
            className="flex items-center gap-2 rounded-xl bg-[#199a42] px-5 py-3 text-[14px] font-bold text-white"
          >
            <Plus size={17} />
            Add Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={() => setSelectedNote(note)}
            onPin={() => togglePin(note.id)}
          />
        ))}
      </div>

      {selectedNote && (
        <NoteDetailsModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onDelete={() => deleteNote(selectedNote.id)}
        />
      )}

      {showAddNote && (
        <AddNoteModal
          onClose={() => setShowAddNote(false)}
          onCreate={addNote}
        />
      )}
    </div>
  );
}

function NoteCard({ note, onClick, onPin }) {
  return (
    <div
      onClick={onClick}
      className="relative min-h-[270px] cursor-pointer bg-white p-7 shadow-sm ring-1 ring-black/5 hover:shadow-md"
    >
      {note.pinned && (
        <div className="absolute left-0 top-0 h-0 w-0 border-l-[28px] border-t-[28px] border-l-[#facc15] border-t-[#facc15] border-r-[28px] border-r-transparent border-b-[28px] border-b-transparent" />
      )}

      <div className="mb-6 flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
        <div className="flex items-center gap-2 text-[13px] font-medium text-gray-500">
          <CalendarDays size={15} />
          {note.date}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPin();
          }}
          className="text-gray-500 hover:text-[#199a42]"
        >
          <Pin
            size={16}
            className={note.pinned ? "fill-gray-600 text-gray-600" : ""}
          />
        </button>
      </div>

      <h2 className="mb-4 text-[20px] font-bold text-gray-800">
        {note.title}
      </h2>

      <p className="line-clamp-6 text-[14px] leading-6 text-gray-600">
        {note.text}
      </p>
    </div>
  );
}

function NoteDetailsModal({ note, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-[560px] rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-7 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className={`h-4 w-4 rounded ${note.color}`} />

            <h2 className="text-[22px] font-bold text-gray-800">
              {note.title}
            </h2>
          </div>

          <div className="flex items-center gap-5 text-gray-500">
            <Edit2 size={17} />
            <button type="button" onClick={onDelete}>
              <Trash2 size={17} />
            </button>
            <MoreHorizontal size={18} />
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4 text-[14px] text-gray-600">
          <CalendarDays size={16} />
          {note.date}
        </div>

        <div className="flex gap-4">
          <div className="pt-1 text-gray-500">
            <MoreHorizontal size={18} />
          </div>

          <p className="text-[15px] leading-7 text-gray-600">
            {note.text}
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing
            velit euismod nisi ad nulla. Magna deserunt ipsum pariatur sunt
            tincidunt culpa cupidatat. Pariatur occaecat enim dolor culpa nisi ea
            eiusmod do qui culpa consectetur laboris eiusmod anim.
          </p>
        </div>
      </div>
    </div>
  );
}

function AddNoteModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("The title of a note");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-[520px] rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-[30px] font-bold text-gray-800">Add Note</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
          >
            <X size={15} />
          </button>
        </div>

        <label className="mb-2 block text-[13px] font-medium text-gray-400">
          Title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-6 h-11 w-full rounded-xl border border-gray-200 px-4 text-[14px] text-gray-700 outline-none"
        />

        <label className="mb-2 block text-[13px] font-medium text-gray-400">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type something"
          className="h-[150px] w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[14px] text-gray-700 outline-none placeholder:text-gray-400"
        />

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() =>
              onCreate({
                title,
                text:
                  description ||
                  "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut labores dolore magnarels aliqua.",
              })
            }
            className="rounded-xl bg-[#199a42] px-8 py-3 text-[14px] font-bold text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesPage;