import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  MoreVertical,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const orders = [
  {
    id: 1,
    checked: true,
    orderNo: "#790841",
    customer: "Claire Warren",
    date: "12.09.20",
    total: "$145.85",
    payment: "PayPal",
    status: "Shipped",
  },
  {
    id: 2,
    checked: true,
    orderNo: "#790841",
    customer: "Theresa Robertson",
    date: "12.09.20",
    total: "$225.15",
    payment: "Credit Card",
    status: "Shipped",
  },
  {
    id: 3,
    checked: true,
    orderNo: "#790841",
    customer: "Nathan Hawkins",
    date: "12.09.20",
    total: "$45.55",
    payment: "PayPal",
    status: "Shipped",
  },
  {
    id: 4,
    checked: true,
    orderNo: "#790841",
    customer: "Lily Williamson",
    date: "12.09.20",
    total: "$305.25",
    payment: "Credit Card",
    status: "Processing",
  },
  {
    id: 5,
    checked: true,
    orderNo: "#790841",
    customer: "Brooklyn Steward",
    date: "12.09.20",
    total: "$483.80",
    payment: "Credit Card",
    status: "Shipped",
  },
  {
    id: 6,
    checked: true,
    orderNo: "#790841",
    customer: "Norma Flores",
    date: "12.09.20",
    total: "$128.79",
    payment: "Payoneer",
    status: "Processing",
  },
  {
    id: 7,
    checked: true,
    orderNo: "#790841",
    customer: "Leslie Mckinney",
    date: "12.09.20",
    total: "$105.05",
    payment: "Credit Card",
    status: "Cancelled",
  },
  {
    id: 8,
    checked: true,
    orderNo: "#790841",
    customer: "Gregory Black",
    date: "12.09.20",
    total: "$1028.15",
    payment: "PayPal",
    status: "Shipped",
  },
];

function EcommercePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState([]);

  function toggleOrder(orderId) {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  }
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-gray-800">Orders</h1>

        <button className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-[14px] font-medium text-gray-600 shadow-sm ring-1 ring-black/5">
          <Download size={17} />
          Export
          <ChevronDown size={15} />
        </button>
      </div>

      <div className="mb-8 flex items-center gap-7">
        <Tab active label="All" count="983" />
        <Tab label="Pending" count="128" />
        <Tab label="Processing" count="15" />
        <Tab label="Refunded" count="8" />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="mb-5 flex items-center gap-5">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3">
            <Search size={18} className="text-gray-400" />

            <input
              placeholder="Search order..."
              className="w-full bg-transparent text-[15px] text-gray-600 outline-none placeholder:text-gray-400"
            />

            <SlidersHorizontal size={18} className="text-gray-500" />
          </div>

          <button className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-[14px] font-medium text-gray-600">
            Actions
            <ChevronDown size={15} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-left text-[13px] font-bold uppercase text-gray-400">
                <th className="w-[50px] py-4">
                  <CheckBox checked={false} />
                </th>

                <th className="py-4">
                  <span className="flex items-center gap-1">
                    Order No.
                    <ChevronDown size={13} />
                  </span>
                </th>

                <th className="py-4">
                  <span className="flex items-center gap-1">
                    Customer
                    <ChevronDown size={13} />
                  </span>
                </th>

                <th className="py-4">
                  <span className="flex items-center gap-1">
                    Date
                    <ChevronDown size={13} />
                  </span>
                </th>

                <th className="py-4">
                  <span className="flex items-center gap-1">
                    Total
                    <ChevronDown size={13} />
                  </span>
                </th>

                <th className="py-4">
                  <span className="flex items-center gap-1">
                    Payment
                    <ChevronDown size={13} />
                  </span>
                </th>

                <th className="py-4">
                  <span className="flex items-center gap-1">
                    Status
                    <ChevronDown size={13} />
                  </span>
                </th>

                <th className="w-[40px] py-4"></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 text-[15px] text-gray-600"
                >
                  <td className="py-5">
                    <CheckBox
                     checked={selectedOrders.includes(order.id)}
                     onClick={() => toggleOrder(order.id)}
                     />
                  </td>

                  <td className="py-5 font-medium text-gray-400">
                    {order.orderNo}
                  </td>

                  <td className="py-5 font-medium text-gray-700">
                    {order.customer}
                  </td>

                  <td className="py-5 text-gray-400">{order.date}</td>

                  <td className="py-5 font-medium text-gray-700">
                    {order.total}
                  </td>

                  <td className="py-5 font-medium text-gray-600">
                    {order.payment}
                  </td>

                  <td className="py-5">
                    <StatusBadge status={order.status} />
                  </td>

                  <td className="py-5 text-right">
                    <button className="text-gray-400">
                      <MoreVertical size={19} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-500">
              10
              <ChevronDown size={14} />
            </button>

            <p className="text-[15px] text-gray-400">Showing 1 - 10 of 100</p>
          </div>

          <div className="flex items-center gap-2">
            <PageButton disabled>
              <ChevronsLeft size={18} />
            </PageButton>

            <PageButton disabled>
              <ChevronLeft size={18} />
            </PageButton>

            <PageButton active>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>

            <span className="px-2 text-gray-400">...</span>

            <PageButton>5</PageButton>

            <PageButton light>
              <ChevronRight size={18} />
            </PageButton>

            <PageButton light>
              <ChevronsRight size={18} />
            </PageButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab({ label, count, active }) {
  return (
    <button
      className={`relative pb-4 text-[15px] font-medium ${
        active ? "text-gray-800" : "text-gray-400"
      }`}
    >
      {label}

      <span className="ml-2 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-400">
        {count}
      </span>

      {active && (
        <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#199a42]" />
      )}
    </button>
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
  const styles = {
    Shipped: "bg-[#e8f8ed] text-[#199a42]",
    Processing: "bg-[#fff2df] text-[#ff9500]",
    Cancelled: "bg-[#ffe9e9] text-[#ff4b4b]",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1.5 text-[12px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
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

export default EcommercePage;