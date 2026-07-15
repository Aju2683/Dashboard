import { useState } from "react";
import avatar from "../assets/avatar.png";
import {
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Download,
  MoreHorizontal,
  MoreVertical,
  Signal,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";



const orders = [
  {
    id: 1,
    name: "Regina Cooper",
    orderNo: "#790841",
    amount: "$2.500",
    payment: "Credit Card",
    date: "12.09.2019",
  },
  {
    id: 2,
    name: "Robert Edwards",
    orderNo: "#799894",
    amount: "$1.500",
    payment: "PayPal",
    date: "12.09.2019",
  },
  {
    id: 3,
    name: "Gloria Mckinney",
    orderNo: "#790857",
    amount: "$5.600",
    payment: "Credit Card",
    date: "12.09.2019",
  },
  {
    id: 4,
    name: "Randall Fisher",
    orderNo: "#790687",
    amount: "$2.850",
    payment: "PayPal",
    date: "12.09.2019",
  },
];

const transactions = [
  {
    id: 1,
    name: "Devon Williamson",
    time: "08:00 AM",
    date: "19 August",
    amount: "+$1.400",
    type: "Payment",
    color: "text-green-500",
  },
  {
    id: 2,
    name: "Debra Wilson",
    time: "09:45 AM",
    date: "19 August",
    amount: "-$850",
    type: "Refund",
    color: "text-red-400",
  },
  {
    id: 3,
    name: "Judith Black",
    time: "10:15 AM",
    date: "20 August",
    amount: "+$2.050",
    type: "Payment",
    color: "text-green-500",
  },
  {
    id: 4,
    name: "Philip Henry",
    time: "10:50 AM",
    date: "23 August",
    amount: "+$650",
    type: "Payment",
    color: "text-green-500",
  },
  {
    id: 5,
    name: "Mitchell Cooper",
    time: "12:45 AM",
    date: "25 August",
    amount: "+$900",
    type: "Payment",
    color: "text-green-500",
  },
];

function OverviewPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-8 py-8">
      <div className="mb-7 flex items-center justify-between">
        <h1 className="text-[26px] font-bold text-gray-800">Overview</h1>

        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
            <Download size={17} />
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[13px] font-medium text-gray-500 shadow-sm ring-1 ring-black/5">
            Last 7 days
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <section className="grid grid-cols-3 gap-6">
        <TopCard
          title="Total Income"
          value="$8.500"
          percent="+50.8%"
          icon={CircleDollarSign}
        />

        <TopCard
          title="Total Sales"
          value="3.500K"
          percent="-10.5%"
          down
          icon={Signal}
        />

        <TopCard
          title="New Clients"
          value="2.500K"
          percent="+24.9%"
          icon={Users}
        />
      </section>

      <section className="mt-6 grid grid-cols-2 gap-6">
        <StatisticsBars />
        <AnalyticsChart />
      </section>

      <section className="mt-6 grid grid-cols-[0.85fr_1.85fr] gap-6">
        <SalesDonut />
        <HorizontalStats />
      </section>

      <section className="mt-6 grid grid-cols-[1.8fr_0.9fr] gap-6">
        <LastOrders />
        <Transactions />
      </section>
    </div>
  );
}

function TopCard({ title, value, percent, down, icon: Icon }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] text-gray-400">{title}</p>

          <div className="mt-2 flex items-end gap-2">
            <h2 className="text-[26px] font-bold text-gray-800">{value}</h2>

            <span
              className={`pb-1 text-[12px] font-bold ${
                down ? "text-red-400" : "text-green-500"
              }`}
            >
              {percent}
            </span>
          </div>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ddfbf3] text-[#39c8b7]">
          <Icon size={34} />
        </div>
      </div>
    </div>
  );
}

function DateButton() {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[12px] font-medium text-gray-500">
      <CalendarDays size={14} />
      19 Aug - 25 Aug
      <ChevronDown size={13} />
    </button>
  );
}

function StatisticsBars() {
  const [showTooltip, setShowTooltip] = useState(false);

  const data = [
    { day: "Mon", income: 190, expense: 340 },
    { day: "Tue", income: 105, expense: 260 },
    { day: "Wed", income: 245, expense: 380 },
    { day: "Thu", income: 190, expense: 260 },
    { day: "Fri", income: 205, expense: 370 },
    { day: "Sat", income: 180, expense: 325 },
    { day: "Sun", income: 155, expense: 220 },
  ];

  const max = 400;
  const height = 210;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-gray-700">Statistics</h2>
        <DateButton />
      </div>

      <div className="relative h-[290px] pl-10">
        <div className="absolute left-0 top-0 flex h-[210px] flex-col justify-between text-[12px] text-gray-400">
          <span>400</span>
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>

        <div className="absolute left-10 right-0 top-0 h-[210px]">
          <GridLines />

          <div className="relative z-10 flex h-full items-end justify-between px-5">
            {data.map((item) => {
              const incomeHeight = (item.income / max) * height;
              const expenseHeight = (item.expense / max) * height;

              return (
                <div
                  key={item.day}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="relative flex h-full w-8 cursor-pointer items-end justify-center"
                >
                  <div
                    className="absolute bottom-0 w-4 rounded-full bg-[#4cc9b8]"
                    style={{ height: expenseHeight }}
                  />
                  <div
                    className="absolute bottom-0 w-4 rounded-full bg-[#16983f]"
                    style={{ height: incomeHeight }}
                  />
                </div>
              );
            })}
          </div>

          {showTooltip && (
            <div className="absolute left-[80px] top-[-35px] z-30 rounded-xl bg-white px-5 py-3 text-center shadow-xl">
              <div className="flex gap-4 text-[12px] font-bold">
                <span className="flex items-center gap-1">
                  <b className="h-2 w-2 rounded-full bg-[#16983f]" />
                  2.500
                </span>

                <span className="flex items-center gap-1">
                  <b className="h-2 w-2 rounded-full bg-[#4cc9b8]" />
                  1.200
                </span>
              </div>

              <p className="text-[11px] text-gray-400">23 August, 2020</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-[42px] left-10 right-0 grid grid-cols-7 px-5 text-center text-[12px] text-gray-400">
          {data.map((item) => (
            <span key={item.day}>{item.day}</span>
          ))}
        </div>

        <div className="absolute bottom-0 right-4 flex gap-8 text-[12px] text-gray-500">
          <span className="flex items-center gap-2">
            <b className="h-2 w-2 rounded-full bg-[#16983f]" />
            Income
          </span>

          <span className="flex items-center gap-2">
            <b className="h-2 w-2 rounded-full bg-[#4cc9b8]" />
            Expense
          </span>
        </div>
      </div>
    </div>
  );
}

function AnalyticsChart() {
  const [showTooltip, setShowTooltip] = useState(false);

  const width = 500;
  const height = 210;
  const max = 400;

  const data = [
    { day: "Mon", income: 20, expense: 10 },
    { day: "Tue", income: 90, expense: 70 },
    { day: "Wed", income: 60, expense: 120 },
    { day: "Thu", income: 170, expense: 65 },
    { day: "Fri", income: 110, expense: 130 },
    { day: "Sat", income: 250, expense: 85 },
    { day: "Sun", income: 310, expense: 60 },
  ];

  const greenPoints = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (item.income / max) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const tealPoints = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (item.expense / max) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-gray-700">Analytics</h2>
        <DateButton />
      </div>

      <div className="mb-4 flex gap-8">
        <MiniStat icon={<TrendingUp size={15} />} value="$5.850" />
        <MiniStat icon={<TrendingDown size={15} />} value="$1.750" />
      </div>

      <div className="relative h-[260px]">
        <div className="absolute inset-0 top-2">
          <GridLines />

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="relative z-10 h-[210px] w-full overflow-visible"
            preserveAspectRatio="none"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <polyline
              points={greenPoints}
              fill="none"
              stroke="#16983f"
              strokeWidth="3"
            />

            <polyline
              points={tealPoints}
              fill="none"
              stroke="#4cc9b8"
              strokeWidth="3"
            />

            <circle
              cx="250"
              cy="120"
              r="6"
              fill="#16983f"
              className="cursor-pointer"
            />
          </svg>

          {showTooltip && (
            <div className="absolute left-[210px] top-[50px] z-30 rounded-xl bg-white px-6 py-3 text-center shadow-xl">
              <p className="text-[12px] font-bold text-gray-700">$1.000</p>
              <p className="text-[11px] text-gray-400">22 August, 2019</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-7 text-center text-[12px] text-gray-400">
          {data.map((item) => (
            <span key={item.day}>{item.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, value }) {
  return (
    <div className="flex items-center gap-3 text-[13px] font-medium text-gray-600">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5f8ef] text-green-500">
        {icon}
      </span>
      {value}
    </div>
  );
}

function SalesDonut() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-gray-700">Sales</h2>
        <MoreHorizontal size={18} className="text-gray-400" />
      </div>

      <div className="flex justify-center">
        <div
          className="flex h-[165px] w-[165px] items-center justify-center rounded-full"
          style={{
            background:
              "conic-gradient(#16983f 0deg 260deg, #4cc9b8 260deg 360deg)",
          }}
        >
          <div className="flex h-[125px] w-[125px] flex-col items-center justify-center rounded-full bg-white">
            <h3 className="text-[24px] font-bold text-gray-700">3.500</h3>
            <p className="text-[12px] text-gray-400">Total</p>
          </div>
        </div>
      </div>

      <div className="mt-7 space-y-4 text-[12px]">
        <SalesRow color="bg-[#16983f]" label="Current Week" value="2.500" good />
        <SalesRow color="bg-[#4cc9b8]" label="Last Week" value="1.000" />
      </div>
    </div>
  );
}

function SalesRow({ color, label, value, good }) {
  return (
    <div className="flex items-center justify-between text-gray-500">
      <span className="flex items-center gap-2">
        <b className={`h-2 w-2 rounded-full ${color}`} />
        {label}
      </span>

      <span>{value}</span>

      <span className={good ? "text-green-500" : "text-red-400"}>
        {good ? "↑ 8.8%" : "↓ 5.8%"}
      </span>
    </div>
  );
}

function HorizontalStats() {
  const rows = [
    [90, 85],
    [150, 170],
    [230, 210],
    [320, 180],
    [160, 300],
    [260, 240],
    [130, 95],
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-gray-700">Statistics</h2>

        <div className="flex items-center gap-5 text-[12px] text-gray-500">
          <span className="flex items-center gap-2">
            <b className="h-2 w-2 rounded-full bg-[#16983f]" />
            Income
          </span>

          <span className="flex items-center gap-2">
            <b className="h-2 w-2 rounded-full bg-[#4cc9b8]" />
            Expense
          </span>

          <DateButton />
        </div>
      </div>

      <div className="relative h-[220px]">
        <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-[12px] text-gray-400">
          {["25", "24", "23", "22", "21", "20", "19"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="ml-12 flex h-full flex-col justify-between py-2">
          {rows.map(([left, right], index) => (
            <div key={`${left}-${right}-${index}`} className="flex items-center justify-center">
              <div
                className="h-4 rounded-l-full bg-[#16983f]"
                style={{ width: left }}
              />

              <div className="h-4 w-px bg-gray-300" />

              <div
                className="h-4 rounded-r-full bg-[#4cc9b8]"
                style={{ width: right }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LastOrders() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-gray-700">Last Orders</h2>
        <DateButton />
      </div>

      <div className="mb-3 grid grid-cols-[2fr_1.2fr_1fr_1.3fr_1fr_30px] px-4 text-[11px] text-gray-400">
        <p>Customer Name</p>
        <p>Order No.</p>
        <p>Amount</p>
        <p>Payment Type</p>
        <p>Date</p>
        <p></p>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[2fr_1.2fr_1fr_1.3fr_1fr_30px] items-center rounded-2xl bg-[#f8f9fb] px-4 py-3 text-[12px]"
          >
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt={order.name}
                className="h-8 w-8 rounded-full object-cover"
              />

              <span className="font-medium text-gray-700">{order.name}</span>
            </div>

            <p className="text-gray-400">{order.orderNo}</p>
            <p className="text-gray-700">{order.amount}</p>
            <p className="text-gray-400">{order.payment}</p>
            <p className="text-gray-700">{order.date}</p>
            <MoreVertical size={16} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Transactions() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-gray-700">Transactions</h2>
        <MoreHorizontal size={18} className="text-gray-400" />
      </div>

      <div className="space-y-4">
        {transactions.map((item) => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <img
                src={avatar}
                alt={item.name}
                className="h-9 w-9 rounded-full object-cover"
              />

              <div>
                <p className="text-[12px] font-bold text-gray-700">
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400">
                  {item.time} — {item.date}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className={`text-[12px] font-bold ${item.color}`}>
                {item.amount}
              </p>

              <p className="text-[11px] text-gray-400">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GridLines() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between">
      {[1, 2, 3, 4, 5].map((line) => (
        <div key={line} className="h-px bg-gray-200" />
      ))}
    </div>
  );
}

export default OverviewPage;