function PlaceholderPage({ title }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-8 py-8">
      <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-black/5">
        <h1 className="text-[30px] font-bold text-gray-800">{title}</h1>

        <p className="mt-3 text-[16px] text-gray-500">
          This is the {title} page. Send this page reference image and we will
          design it exactly.
        </p>
      </div>
    </div>
  );
}

export default PlaceholderPage;