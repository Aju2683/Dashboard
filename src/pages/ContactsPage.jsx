import { useState } from "react";
import avatar from "../assets/avatar.png";
import {
  ChevronDown,
  Edit2,
  MoreHorizontal,
  Plus,
  Search,
  X,
} from "lucide-react";



const initialContacts = [
  {
    id: 1,
    firstName: "Regina",
    lastName: "Cooper",
    name: "Regina Cooper",
    role: "Manager",
    location: "Sochi, Russia",
    email: "cooper@example.com",
    phone: "+1 (070) 123-4567",
    badge: "Manager",
  },
  {
    id: 2,
    firstName: "Judith",
    lastName: "Black",
    name: "Judith Black",
    role: "Creative Director",
    location: "New York, USA",
    email: "black@example.com",
    phone: "+1 (070) 123-8459",
    badge: "Creative Director",
  },
  {
    id: 3,
    firstName: "Ronald",
    lastName: "Robertson",
    name: "Ronald Robertson",
    role: "Manager",
    location: "Paris, France",
    email: "robe@example.com",
    phone: "+1 (070) 123-9221",
    badge: "Manager",
  },
  {
    id: 4,
    firstName: "Dustin",
    lastName: "Williamson",
    name: "Dustin Williamson",
    role: "Designer",
    location: "Sydney, Australia",
    email: "williams@example.com",
    phone: "+1 (070) 123-4567",
    badge: "Designer",
  },
  {
    id: 5,
    firstName: "Calvin",
    lastName: "Flores",
    name: "Calvin Flores",
    role: "Manager",
    location: "Berlin, Germany",
    email: "flores@example.com",
    phone: "+1 (070) 123-3791",
    badge: "Manager",
  },
  {
    id: 6,
    firstName: "Robert",
    lastName: "Edwards",
    name: "Robert Edwards",
    role: "Developer",
    location: "Shanghai, China",
    email: "edwards@example.com",
    phone: "+1 (070) 123-1147",
    badge: "Developer",
  },
  {
    id: 7,
    firstName: "Nathan",
    lastName: "Fox",
    name: "Nathan Fox",
    role: "Designer",
    location: "London, UK",
    email: "fox@example.com",
    phone: "+1 (070) 123-5073",
    badge: "Designer",
  },
  {
    id: 8,
    firstName: "Colleen",
    lastName: "Warren",
    name: "Colleen Warren",
    role: "Manager",
    location: "Ottawa, Canada",
    email: "warren@example.com",
    phone: "+1 (070) 123-9127",
    badge: "Manager",
  },
  {
    id: 9,
    firstName: "Bessie",
    lastName: "Henry",
    name: "Bessie Henry",
    role: "Developer",
    location: "New York, USA",
    email: "henry@example.com",
    phone: "+1 (070) 123-3578",
    badge: "Designer",
  },
  {
    id: 10,
    firstName: "Philip",
    lastName: "Mccoy",
    name: "Philip Mccoy",
    role: "Developer",
    location: "Sydney, Australia",
    email: "mccoy@example.com",
    phone: "+1 (070) 123-4588",
    badge: "Developer",
  },
  {
    id: 11,
    firstName: "Dustin",
    lastName: "Lane",
    name: "Dustin Lane",
    role: "Manager",
    location: "Los Angeles, USA",
    email: "lane@example.com",
    phone: "+1 (070) 123-0215",
    badge: "Manager",
  },
  {
    id: 12,
    firstName: "Shane",
    lastName: "Black",
    name: "Shane Black",
    role: "Manager",
    location: "Oslo, Norway",
    email: "black@example.com",
    phone: "+1 (070) 123-8896",
    badge: "Manager",
  },
];

function ContactsPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchText, setSearchText] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [editContact, setEditContact] = useState(null);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  function addContact(newContact) {
    setContacts((prev) => [
      {
        ...newContact,
        id: Date.now(),
        name: `${newContact.firstName} ${newContact.lastName}`,
        badge: newContact.jobTitle,
        role: newContact.jobTitle,
      },
      ...prev,
    ]);

    setShowAddContact(false);
  }

  function updateContact(updatedContact) {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === updatedContact.id
          ? {
              ...updatedContact,
              name: `${updatedContact.firstName} ${updatedContact.lastName}`,
              badge: updatedContact.jobTitle,
              role: updatedContact.jobTitle,
            }
          : contact
      )
    );

    setEditContact(null);
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-8 py-8">
      <div className="mb-7 flex items-center gap-5">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-black/5">
          <Search size={18} className="text-gray-400" />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search contact..."
            className="w-full bg-transparent text-[14px] text-gray-600 outline-none placeholder:text-gray-400"
          />

          {searchText && (
            <button
              type="button"
              onClick={() => setSearchText("")}
              className="text-[20px] leading-none text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowAddContact(true)}
          className="flex items-center gap-2 rounded-xl bg-[#199a42] px-6 py-4 text-[14px] font-bold text-white shadow-sm"
        >
          <Plus size={17} />
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-4 gap-7">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={() => setEditContact(contact)}
          />
        ))}
      </div>

      {showAddContact && (
        <ContactModal
          title="New Contact"
          mode="add"
          onClose={() => setShowAddContact(false)}
          onSubmit={addContact}
        />
      )}

      {editContact && (
        <ContactModal
          title="Edit Contact"
          mode="edit"
          contact={editContact}
          onClose={() => setEditContact(null)}
          onSubmit={updateContact}
        />
      )}
    </div>
  );
}

function ContactCard({ contact, onEdit }) {
  const isDesigner = contact.badge === "Designer";

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt={contact.name}
            className="h-[64px] w-[64px] rounded-2xl object-cover"
          />

          <div>
            <h2 className="text-[18px] font-bold text-gray-800">
              {contact.name}
            </h2>

            <p className="mt-1 text-[13px] text-gray-400">{contact.role}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="text-gray-400 hover:text-gray-700"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <InfoLine label="Location:" value={contact.location} />
        <InfoLine label="Email:" value={contact.email} />
        <InfoLine label="Phone:" value={contact.phone} />
      </div>
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="mb-5 flex items-center justify-between text-[13px]">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-400">{value}</span>
    </div>
  );
}

function ContactModal({ title, mode, contact, onClose, onSubmit }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    id: contact?.id,
    firstName: contact?.firstName || "Regina",
    lastName: contact?.lastName || "Cooper",
    email: contact?.email || "cooper@example.com",
    phone: contact?.phone || "+1 (070) 123-4567",
    jobTitle: contact?.role || "Manager",
    address: contact?.location || "Sochi, Russia",
    birthDay: "17",
    birthMonth: "March",
    birthYear: "1995",
    notes:
      isEdit
        ? "Leadership: An experienced team leader\nInfluencing, leading, and delegating abilities\nPlanning and organizing – Organizational abilities.\nAbility to achieve the target within given time.\nCritical thinking, decision making and problem solving skills."
        : "",
  });

  function updateForm(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/25 pt-8">
      <div className="w-[470px] rounded-xl bg-white p-7 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[26px] font-bold text-gray-800">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
          >
            <X size={15} />
          </button>
        </div>

        <div className="mb-7 flex justify-center">
          <div className="relative">
            <div className="flex h-[92px] w-[92px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
              {isEdit ? (
                <img
                  src={avatar}
                  alt="contact"
                  className="h-[78px] w-[78px] rounded-2xl object-cover"
                />
              ) : (
                <Plus size={28} className="text-gray-500" />
              )}
            </div>

            {isEdit && (
              <button className="absolute right-[-8px] top-[-8px] flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
                <Edit2 size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputBox
            label="First Name"
            value={form.firstName}
            onChange={(e) => updateForm("firstName", e.target.value)}
          />

          <InputBox
            label="Last Name"
            value={form.lastName}
            onChange={(e) => updateForm("lastName", e.target.value)}
          />
        </div>

        <InputBox
          label="Email"
          value={form.email}
          onChange={(e) => updateForm("email", e.target.value)}
        />

        <label className="mb-2 mt-4 block text-[12px] font-medium text-gray-400">
          Phone
        </label>

        <div className="flex h-11 overflow-hidden rounded-xl border border-gray-200">
          <select className="w-[72px] border-r border-gray-200 px-3 text-[13px] text-gray-600 outline-none">
            <option>+1</option>
            <option>+91</option>
          </select>

          <input
            value={form.phone}
            onChange={(e) => updateForm("phone", e.target.value)}
            className="flex-1 px-4 text-[13px] text-gray-700 outline-none"
          />
        </div>

        <InputBox
          label="Job Title"
          value={form.jobTitle}
          onChange={(e) => updateForm("jobTitle", e.target.value)}
        />

        <InputBox
          label="Address"
          value={form.address}
          onChange={(e) => updateForm("address", e.target.value)}
        />

        <label className="mb-2 mt-4 block text-[12px] font-medium text-gray-400">
          Date of Birth
        </label>

        <div className="grid grid-cols-3 gap-4">
          <SelectBox
            value={form.birthDay}
            onChange={(e) => updateForm("birthDay", e.target.value)}
            options={["17", "18", "19", "20"]}
          />

          <SelectBox
            value={form.birthMonth}
            onChange={(e) => updateForm("birthMonth", e.target.value)}
            options={["March", "April", "May", "June"]}
          />

          <SelectBox
            value={form.birthYear}
            onChange={(e) => updateForm("birthYear", e.target.value)}
            options={["1995", "1996", "1997", "1998"]}
          />
        </div>

        <label className="mb-2 mt-4 block text-[12px] font-medium text-gray-400">
          Notes
        </label>

        <textarea
          value={form.notes}
          onChange={(e) => updateForm("notes", e.target.value)}
          placeholder="Type something"
          className="h-[120px] w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[13px] text-gray-700 outline-none placeholder:text-gray-400"
        />

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => onSubmit(form)}
            className="rounded-xl bg-[#199a42] px-7 py-3 text-[14px] font-bold text-white"
          >
            {isEdit ? "Save Contact" : "Add Contact"}
          </button>
        </div>
      </div>
    </div>
  );
}

function InputBox({ label, value, onChange }) {
  return (
    <div className="mt-4">
      <label className="mb-2 block text-[12px] font-medium text-gray-400">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none"
      />
    </div>
  );
}

function SelectBox({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="h-11 w-full appearance-none rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-3.5 text-gray-400"
      />
    </div>
  );
}

export default ContactsPage;