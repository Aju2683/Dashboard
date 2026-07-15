import { useState } from "react";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Grid2X2,
  List,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    productNo: "#790841",
    category: "Notebook",
    date: "12.09.20",
    price: "$2.500",
    status: "Available",
  },
  {
    id: 2,
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    productNo: "#790841",
    category: "Watch",
    date: "12.09.20",
    price: "$2.500",
    status: "Available",
  },
  {
    id: 3,
    name: "Apple iPhone 11 Pro Max 256GB Space Gray",
    productNo: "#790841",
    category: "Phone",
    date: "12.09.20",
    price: "$2.500",
    status: "Available",
  },
  {
    id: 4,
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    productNo: "#790841",
    category: "Watch",
    date: "12.09.20",
    price: "$2.500",
    status: "Available",
  },
  {
    id: 5,
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    productNo: "#790841",
    category: "Notebook",
    date: "12.09.20",
    price: "$2.500",
    status: "Disabled",
  },
  {
    id: 6,
    name: "Apple iPhone 11 Pro Max 64GB Midnight Green",
    productNo: "#790841",
    category: "Phone",
    date: "12.09.20",
    price: "$2.500",
    status: "Disabled",
  },
  {
    id: 7,
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    productNo: "#790841",
    category: "Notebook",
    date: "12.09.20",
    price: "$2.500",
    status: "Available",
  },
  {
    id: 8,
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    productNo: "#790841",
    category: "Watch",
    date: "12.09.20",
    price: "$2.500",
    status: "Available",
  },
];

function ProductsPage() {
  const [searchText, setSearchText] = useState("");
  const [showSearchList, setShowSearchList] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const searchSuggestions =
    searchText.trim() === ""
      ? []
      : products.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        );

  function toggleProduct(productId) {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }

  function clearSearch() {
    setSearchText("");
    setShowSearchList(false);
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-gray-800">Products</h1>

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

      <div className="mb-8 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-8">
          <ProductTab active label="All" count="283" />
          <ProductTab label="Available" count="268" />
          <ProductTab label="Disabled" count="15" />
        </div>

        <div className="flex items-center gap-6 pb-4">
          <button className="text-[#199a42]">
            <List size={18} />
          </button>

          <button className="text-gray-400">
            <Grid2X2 size={17} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="relative mb-5 flex items-center gap-5">
          <div className="relative flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3">
            <Search size={18} className="text-gray-400" />

            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setShowSearchList(true);
              }}
              onFocus={() => setShowSearchList(true)}
              placeholder="Search products..."
              className="w-full bg-transparent text-[15px] text-gray-600 outline-none placeholder:text-gray-400"
            />

            {searchText && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-[20px] leading-none text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowFilter(!showFilter)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <SlidersHorizontal size={18} />
            </button>

            {showSearchList && searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[52px] z-40 rounded-b-2xl bg-white py-2 shadow-xl ring-1 ring-black/5">
                {searchSuggestions.map((product) => (
                  <button
                    key={`suggestion-${product.id}`}
                    type="button"
                    onClick={() => {
                      setSearchText(product.name);
                      setShowSearchList(false);
                    }}
                    className="block w-full px-5 py-3 text-left text-[14px] font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-[14px] font-medium text-gray-600">
            Actions
            <ChevronDown size={15} />
          </button>

          {showFilter && <ProductFilter />}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-left text-[12px] font-bold uppercase text-gray-400">
                <th className="w-[50px] py-4">
                  <CheckBox checked={false} />
                </th>

                <TableHead label="Product Name" />
                <TableHead label="Product No." />
                <TableHead label="Category" />
                <TableHead label="Date" />
                <TableHead label="Price" />
                <TableHead label="Status" />

                <th className="w-[40px] py-4"></th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-10 text-center text-[15px] font-medium text-gray-400"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 text-[14px] text-gray-600"
                  >
                    <td className="py-5">
                      <CheckBox
                        checked={selectedProducts.includes(product.id)}
                        onClick={() => toggleProduct(product.id)}
                      />
                    </td>

                    <td className="py-5 font-medium text-gray-700">
                      {product.name}
                    </td>

                    <td className="py-5 font-medium text-gray-400">
                      {product.productNo}
                    </td>

                    <td className="py-5 font-medium text-gray-700">
                      {product.category}
                    </td>

                    <td className="py-5 text-gray-400">{product.date}</td>

                    <td className="py-5 font-medium text-gray-700">
                      {product.price}
                    </td>

                    <td className="py-5">
                      <StatusBadge status={product.status} />
                    </td>

                    <td className="py-5 text-right">
                      <button className="text-gray-400">
                        <MoreVertical size={19} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
      </div>
    </div>
  );
}

function ProductTab({ label, count, active }) {
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
  const isAvailable = status === "Available";

  return (
    <span
      className={`rounded-lg px-3 py-1.5 text-[12px] font-medium ${
        isAvailable
          ? "bg-[#e8f8ed] text-[#199a42]"
          : "bg-[#fff1e8] text-[#ff7a00]"
      }`}
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

function ProductFilter() {
  return (
    <div className="absolute right-[105px] top-[48px] z-50 w-[360px] rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
      <h2 className="mb-6 text-[26px] font-bold text-gray-800">Filter</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-[13px] font-medium text-gray-400">
            Product Name
          </label>

          <select className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-[14px] text-gray-600 outline-none">
            <option>All Products</option>
            <option>MacBook Pro 15 Retina Touch Bar MV902</option>
            <option>Apple Watch Series 5 Edition GPS + Cellular</option>
            <option>Apple iPhone 11 Pro Max 256GB Space Gray</option>
            <option>Apple iPhone 11 Pro Max 64GB Midnight Green</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium text-gray-400">
            Product No.
          </label>

          <select className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-[14px] text-gray-600 outline-none">
            <option>All Product Numbers</option>
            <option>#790841</option>
            <option>#790842</option>
            <option>#790843</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium text-gray-400">
            Category
          </label>

          <select className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-[14px] text-gray-600 outline-none">
            <option>All</option>
            <option>Notebook</option>
            <option>Watch</option>
            <option>Phone</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium text-gray-400">
            Status
          </label>

          <select className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-[14px] text-gray-600 outline-none">
            <option>Available</option>
            <option>Disabled</option>
            <option>All</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium text-gray-400">
            Date
          </label>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-[13px] text-gray-600 outline-none"
            />

            <input
              type="date"
              className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-[13px] text-gray-600 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-[13px] font-medium text-gray-400">
            Price
          </label>

          <div className="relative h-8">
            <div className="absolute left-0 right-0 top-3 h-1 rounded-full bg-gray-200" />
            <div className="absolute left-[18%] right-[16%] top-3 h-1 rounded-full bg-[#199a42]" />

            <span className="absolute left-[16%] top-[7px] h-4 w-4 rounded-full border-4 border-white bg-[#199a42] shadow" />
            <span className="absolute right-[14%] top-[7px] h-4 w-4 rounded-full border-4 border-white bg-[#199a42] shadow" />
          </div>

          <div className="flex justify-between text-[13px] font-medium text-gray-500">
            <span>$500</span>
            <span>$5.500</span>
          </div>
        </div>

        <button className="ml-auto block rounded-xl bg-[#199a42] px-9 py-3 text-[14px] font-bold text-white">
          Save
        </button>
      </div>
    </div>
  );
}

export default ProductsPage;