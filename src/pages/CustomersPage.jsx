import { useState } from "react";
import avatar from "../assets/avatar.png";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Edit2,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";



const customers = [
  {
    id: 1,
    name: "Regina Cooper",
    email: "cooper@example.com",
    location: "Sochi, Russia",
    phone: "+1 (070) 123-4567",
    date: "12.09.20",
    status: "Active",
  },
  {
    id: 2,
    name: "Judith Black",
    email: "black@example.com",
    location: "France, Paris",
    phone: "+1 (070) 123-8459",
    date: "12.09.20",
    status: "Active",
  },
  {
    id: 3,
    name: "Ronald Robertson",
    email: "robe@example.com",
    location: "Sydney, Australia",
    phone: "+1 (070) 123-9221",
    date: "12.09.20",
    status: "Blocked",
  },
  {
    id: 4,
    name: "Dustin Williamson",
    email: "williams@example.com",
    location: "Germany, Berlin",
    phone: "+1 (070) 123-0507",
    date: "12.09.20",
    status: "Active",
  },
  {
    id: 5,
    name: "Calvin Flores",
    email: "flores@example.com",
    location: "New York, USA",
    phone: "+1 (070) 123-3791",
    date: "12.09.20",
    status: "Active",
  },
  {
    id: 6,
    name: "Robert Edwards",
    email: "edwards@example.com",
    location: "Shanghai, China",
    phone: "+1 (070) 123-1147",
    date: "12.09.20",
    status: "Active",
  },
  {
    id: 7,
    name: "Colleen Warren",
    email: "warren@example.com",
    location: "Canada, Ottawa",
    phone: "+1 (070) 123-9127",
    date: "12.09.20",
    status: "Active",
  },
  {
    id: 8,
    name: "Nathan Fox",
    email: "fox@example.com",
    location: "London, UK",
    phone: "+1 (070) 123-5073",
    date: "12.09.20",
    status: "Active",
  },
];

function CustomersPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchText.toLowerCase())
  );

  function toggleCustomer(customerId) {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-gray-800">Customers</h1>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-[14px] font-medium text-gray-600 shadow-sm ring-1 ring-black/5">
            <Download size={17} />
            Export
            <ChevronDown size={15} />
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#199a42] text-white shadow-sm">
            <Plus size={21} />
          </button>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-8 border-b border-gray-200">
        <CustomerTab active label="All" count="983" />
        <CustomerTab label="Active" count="968" />
        <CustomerTab label="Blocked" count="15" />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="relative mb-5 flex items-center gap-5">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3">
            <Search size={18} className="text-gray-400" />

            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search customer..."
              className="w-full bg-transparent text-[15px] text-gray-600 outline-none placeholder:text-gray-400"
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

            <SlidersHorizontal size={18} className="text-gray-500" />
          </div>

          <button className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-[14px] font-medium text-gray-600">
            Actions
            <ChevronDown size={15} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-left text-[12px] font-bold uppercase text-gray-400">
                <th className="w-[50px] py-4">
                  <CheckBox checked={false} />
                </th>

                <TableHead label="Customer Name" />
                <TableHead label="Location" />
                <TableHead label="Phone" />
                <TableHead label="Date" />
                <TableHead label="Status" />

                <th className="w-[40px] py-4"></th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className="cursor-pointer border-b border-gray-100 text-[14px] text-gray-600 hover:bg-gray-50"
                >
                  <td
                    className="py-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCustomer(customer.id);
                    }}
                  >
                    <CheckBox checked={selectedCustomers.includes(customer.id)} />
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={avatar}
                        alt={customer.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="text-[15px] font-semibold text-gray-700">
                          {customer.name}
                        </p>
                        <p className="mt-0.5 text-[13px] text-gray-400">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 font-medium text-gray-400">
                    {customer.location}
                  </td>

                  <td className="py-5 font-medium text-gray-700">
                    {customer.phone}
                  </td>

                  <td className="py-5 text-gray-400">{customer.date}</td>

                  <td className="py-5">
                    <StatusBadge status={customer.status} />
                  </td>

                  <td
                    className="py-5 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="text-gray-400">
                      <MoreVertical size={19} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>

      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onSubmit={() => {
            setSelectedCustomer(null);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && (
        <SuccessPopup onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}

function CustomerModal({ customer, onClose, onSubmit }) {
  const [step, setStep] = useState("profile");

  const [form, setForm] = useState({
    firstName: customer.name.split(" ")[0],
    lastName: customer.name.split(" ")[1] || "",
    email: customer.email,
    phone: "+1 (070) 4567-8800",
    status: customer.status,

    address1: "993 E. Brewer St. Holtsville",
    address2: "",
    city: "New York",
    country: "United States",
    state: "New York",
    postcode: "11742",

    paymentMethod: "Credit Card",
    cardNumber: "5890 - 6858 - 6332 - 9843",
    cardHolder: customer.name,
    month: "12",
    year: "2023",
  });

  const tabs = [
    { id: "profile", label: "PROFILE" },
    { id: "address", label: "ADDRESS" },
    { id: "payment", label: "PAYMENT" },
    { id: "submission", label: "SUBMISSION" },
  ];

  function updateForm(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/25 pt-14">
      <div className="w-[430px] rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6">
          <div className="flex gap-7">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStep(tab.id)}
                className={`relative py-4 text-[11px] font-bold ${
                  step === tab.id ? "text-[#199a42]" : "text-gray-500"
                }`}
              >
                {tab.label}

                {step === tab.id && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#199a42]" />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
          >
            <X size={14} />
          </button>
        </div>

        {step === "profile" && (
          <ProfileStep
            form={form}
            updateForm={updateForm}
            onNext={() => setStep("address")}
          />
        )}

        {step === "address" && (
          <AddressStep
            form={form}
            updateForm={updateForm}
            onPrev={() => setStep("profile")}
            onNext={() => setStep("payment")}
          />
        )}

        {step === "payment" && (
          <PaymentStep
            form={form}
            updateForm={updateForm}
            onPrev={() => setStep("address")}
            onNext={() => setStep("submission")}
          />
        )}

        {step === "submission" && (
          <SubmissionStep
            form={form}
            onPrev={() => setStep("payment")}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

function ProfileStep({ form, updateForm, onNext }) {
  return (
    <div className="px-7 py-6">
      <h2 className="mb-5 text-[26px] font-bold text-gray-800">Profile</h2>

      <div className="mb-7 flex justify-center">
        <div className="relative">
          <div className="rounded-full border border-dashed border-gray-300 p-2">
            <img
              src={avatar}
              alt="profile"
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>

          <button className="absolute right-1 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
            <Edit2 size={13} />
          </button>
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
          value={form.phone.replace("+1 ", "")}
          onChange={(e) => updateForm("phone", `+1 ${e.target.value}`)}
          className="flex-1 px-4 text-[13px] text-gray-700 outline-none"
        />
      </div>

      <label className="mb-2 mt-4 block text-[12px] font-medium text-gray-400">
        Status
      </label>
      <select
        value={form.status}
        onChange={(e) => updateForm("status", e.target.value)}
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none"
      >
        <option>Active</option>
        <option>Blocked</option>
      </select>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-[#199a42] px-7 py-3 text-[13px] font-bold text-white"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

function AddressStep({ form, updateForm, onPrev, onNext }) {
  return (
    <div className="px-7 py-6">
      <h2 className="mb-5 text-[26px] font-bold text-gray-800">Address</h2>

      <InputBox
        label="Address Line 1"
        value={form.address1}
        onChange={(e) => updateForm("address1", e.target.value)}
      />

      <InputBox
        label="Address Line 2"
        value={form.address2}
        placeholder="Optional"
        onChange={(e) => updateForm("address2", e.target.value)}
      />

      <InputBox
        label="City"
        value={form.city}
        onChange={(e) => updateForm("city", e.target.value)}
      />

      <label className="mb-2 mt-4 block text-[12px] font-medium text-gray-400">
        Country
      </label>
      <select
        value={form.country}
        onChange={(e) => updateForm("country", e.target.value)}
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none"
      >
        <option>United States</option>
        <option>India</option>
        <option>United Kingdom</option>
        <option>Canada</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <InputBox
          label="State/Region"
          value={form.state}
          onChange={(e) => updateForm("state", e.target.value)}
        />

        <InputBox
          label="Postcode"
          value={form.postcode}
          onChange={(e) => updateForm("postcode", e.target.value)}
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl border border-gray-200 px-7 py-3 text-[13px] font-bold text-gray-600"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-[#199a42] px-7 py-3 text-[13px] font-bold text-white"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

function PaymentStep({ form, updateForm, onPrev, onNext }) {
  return (
    <div className="px-7 py-6">
      <h2 className="mb-6 text-[26px] font-bold text-gray-800">Payment</h2>

      <p className="mb-3 text-[12px] font-medium text-gray-400">
        Choose payment method:
      </p>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <PaymentOption
          active={form.paymentMethod === "Credit Card"}
          label="Credit Card"
          onClick={() => updateForm("paymentMethod", "Credit Card")}
        />

        <PaymentOption
          active={form.paymentMethod === "PayPal"}
          label="PayPal"
          onClick={() => updateForm("paymentMethod", "PayPal")}
        />
      </div>

      <InputBox
        label="Card Number"
        value={form.cardNumber}
        onChange={(e) => updateForm("cardNumber", e.target.value)}
      />

      <InputBox
        label="Card Holder"
        value={form.cardHolder}
        onChange={(e) => updateForm("cardHolder", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputBox
          label="Month"
          value={form.month}
          onChange={(e) => updateForm("month", e.target.value)}
        />

        <InputBox
          label="Year"
          value={form.year}
          onChange={(e) => updateForm("year", e.target.value)}
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl border border-gray-200 px-7 py-3 text-[13px] font-bold text-gray-600"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-[#199a42] px-7 py-3 text-[13px] font-bold text-white"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

function SubmissionStep({ form, onPrev, onSubmit }) {
  return (
    <div className="px-7 py-6">
      <h2 className="mb-6 text-[26px] font-bold text-gray-800">Submission</h2>

      <SummaryBlock
        title="Profile Details"
        rows={[
          `Name: ${form.firstName} ${form.lastName}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
        ]}
      />

      <SummaryBlock
        title="Address Details"
        rows={[
          `Address Line 1: ${form.address1}`,
          `City: ${form.city}`,
          `Country: ${form.country}`,
          `State/Region: ${form.state}`,
          `Postcode: ${form.postcode}`,
        ]}
      />

      <SummaryBlock
        title="Payment Details"
        rows={[
          `Card Number: ${form.cardNumber}`,
          `Card Name: ${form.cardHolder}`,
          `Card Expiry: ${form.month}/${form.year}`,
        ]}
      />

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl border border-gray-200 px-7 py-3 text-[13px] font-bold text-gray-600"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="rounded-xl bg-[#199a42] px-7 py-3 text-[13px] font-bold text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function InputBox({ label, value, onChange, placeholder }) {
  return (
    <div className="mt-4">
      <label className="mb-2 block text-[12px] font-medium text-gray-400">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none placeholder:text-gray-400"
      />
    </div>
  );
}

function PaymentOption({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-12 items-center gap-3 rounded-xl px-4 text-left text-[13px] font-medium ${
        active
          ? "border border-[#199a42] bg-white text-gray-700"
          : "border border-transparent bg-gray-50 text-gray-500"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded ${
          active ? "bg-[#199a42] text-white" : "bg-white"
        }`}
      >
        {active && <Check size={11} strokeWidth={4} />}
      </span>
      {label}
    </button>
  );
}

function SummaryBlock({ title, rows }) {
  return (
    <div className="border-b border-gray-100 py-4">
      <h3 className="mb-2 text-[16px] font-bold text-gray-700">{title}</h3>

      <div className="space-y-1">
        {rows.map((row) => (
          <p key={row} className="text-[12px] text-gray-500">
            {row}
          </p>
        ))}
      </div>
    </div>
  );
}

function SuccessPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
      <div className="w-[340px] rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f8ed] text-[#199a42]">
          <Check size={34} strokeWidth={4} />
        </div>

        <h2 className="text-[24px] font-bold text-gray-800">
          Submitted!
        </h2>

        <p className="mt-2 text-[14px] text-gray-500">
          Customer profile has been submitted successfully.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-xl bg-[#199a42] px-8 py-3 text-[14px] font-bold text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function CustomerTab({ label, count, active }) {
  return (
    <button
      type="button"
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

function TableHead({ label }) {
  return (
    <th className="py-4">
      <span className="flex items-center gap-1">
        {label}
        <ChevronDown size={13} />
      </span>
    </th>
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
      {checked && <Check size={12} strokeWidth={4} />}
    </button>
  );
}

function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`rounded-lg px-4 py-1.5 text-[12px] font-medium ${
        isActive
          ? "bg-[#e8f8ed] text-[#199a42]"
          : "bg-[#fff1e8] text-[#ff7a00]"
      }`}
    >
      {status}
    </span>
  );
}

function Pagination() {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-gray-500">
          10
          <ChevronDown size={14} />
        </button>

        <p className="text-[15px] text-gray-400">Showing 1 - 10 of 100</p>
      </div>

      <div className="flex items-center gap-2">
        <PageButton disabled>
          <ChevronsLeft size={17} />
        </PageButton>

        <PageButton disabled>
          <ChevronLeft size={17} />
        </PageButton>

        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>

        <span className="px-2 text-gray-400">...</span>

        <PageButton>5</PageButton>

        <PageButton light>
          <ChevronRight size={17} />
        </PageButton>

        <PageButton light>
          <ChevronsRight size={17} />
        </PageButton>
      </div>
    </div>
  );
}

function PageButton({ children, active, disabled, light }) {
  return (
    <button
      className={`flex h-9 w-9 items-center justify-center rounded-xl text-[14px] font-bold ${
        active
          ? "bg-[#199a42] text-white"
          : light
          ? "bg-[#e8f8ed] text-[#199a42]"
          : disabled
          ? "bg-gray-100 text-gray-300"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export default CustomersPage;