
import React from "react";
import useData from "../hooks/useData";
import "../App.css";

const propertyLabels = [
	{ key: "Image_URL", label: "Image" },
	{ key: "extracted_text", label: "Text Extracted" },
	{ key: "manufacturer_name", label: "Manufacturer Name" },
	{ key: "manufacturer_address", label: "Manufacturer Address" },
	{ key: "net_quantity", label: "Net Quantity" },
	{ key: "retail_price", label: "MRP" },
	{ key: "consumer_care_details", label: "Consumer Care" },
	{ key: "manufacture_import_date", label: "Manufacture Date" },
	{ key: "country_of_origin", label: "Country of Origin" },
	{ key: "packer_importer_name", label: "Importer Name" },
	{ key: "packer_importer_address", label: "Importer Address" },
];


const summaryCards = [
  { key: 'manufacturermissing', label: 'Manufacturer Info Missing', color: 'bg-yellow-50', text: 'text-yellow-700' },
  { key: 'netquantitymissing', label: 'Net Quantity Missing', color: 'bg-orange-50', text: 'text-orange-700' },
  { key: 'mrpmissing', label: 'MRP Missing', color: 'bg-pink-50', text: 'text-pink-700' },
  { key: 'consumerCareMissing', label: 'Consumer Care Missing', color: 'bg-purple-50', text: 'text-purple-700' },
  { key: 'manufacturerDateMissing', label: 'Manufacture Date Missing', color: 'bg-blue-50', text: 'text-blue-700' },
  { key: 'countryOriginMissing', label: 'Country of Origin Missing', color: 'bg-green-50', text: 'text-green-700' },
];

const Flagged = () => {
	const {
		flaggedProducts,
		manufacturermissing,
		netquantitymissing,
		mrpmissing,
		consumerCareMissing,
		manufacturerDateMissing,
		countryOriginMissing
	} = useData();

	return (
		<div className="flex h-screen font-sans">
			{/* Sidebar */}
			<aside className="w-70 bg-gray-50 border-r border-gray-200 py-6 flex flex-col">
				<div className="px-6 mb-8">
					<h2 className="m-0 text-lg font-semibold text-gray-600">MAIN NAVIGATION</h2>
				</div>
				<nav className="flex-1 px-6">
					<div className="mb-6">
						<a href="/" className="flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-md mb-2 hover:bg-blue-600 hover:text-white transition">
							<span className="text-base">📊</span>
							<span className="text-sm font-medium">Dashboard</span>
						</a>
						<div className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-md mb-2">
							<span className="text-base">🚩</span>
							<span className="text-sm font-medium">Flagged Products</span>
						</div>
					</div>
				</nav>
				<div className="px-6 py-4 border-t border-gray-200 flex items-center gap-3">
					<div className="w-10 h-10 p-2 rounded-full bg-blue-600 flex items-center justify-center text-white text-base font-bold">🏛️</div>
					<div>
						<div className="text-sm font-medium text-gray-700">Ministry of Consumer Affairs, Food & Public Distribution</div>
						{/* <div className="text-xs text-gray-500">Help Center</div> */}
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 bg-gray-50 overflow-auto">
				<div className="bg-white px-8 py-6 border-b border-gray-200">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="m-0 text-2xl font-semibold text-gray-800 mb-1">Flagged Products</h1>
							<p className="m-0 text-sm text-gray-500">Products flagged for compliance review</p>
						</div>
					</div>
				</div>

				<div className="p-8">
					{/* Summary Cards */}
					<div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{summaryCards.map(card => (
							<div key={card.key} className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border border-gray-100 ${card.color}`}>
								<div className={`text-xs font-semibold mb-1 ${card.text}`}>{card.label}</div>
								<div className={`text-lg font-bold ${card.text}`}>{eval(card.key).length}</div>
							</div>
						))}
					</div>

					<div className="bg-white rounded-2xl shadow-lg overflow-x-auto border border-gray-100">
						<div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-2xl">
							<h3 className="m-0 text-xl font-bold tracking-tight text-gray-700">Flagged Products Table</h3>
							<span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">Total: {flaggedProducts.length}</span>
						</div>
						<table className="w-full border-separate border-spacing-y-2">
							<thead className="bg-white sticky top-[70px] z-10">
								<tr>
									<th className="px-4 py-3 text-left text-xs font-bold text-gray-400">#</th>
									<th className="px-4 py-3 text-left text-xs font-bold text-gray-400">Product URL</th>
									{propertyLabels.map((prop) => (
										<th key={prop.key} className="px-2 py-3 text-center text-xs font-bold text-gray-400">{prop.label}</th>
									))}
									<th className="px-4 py-3 text-center text-xs font-bold text-gray-400">Score</th>
								</tr>
							</thead>
							<tbody>
								{flaggedProducts.length === 0 ? (
									<tr>
										<td colSpan={propertyLabels.length + 3} className="px-6 py-8 text-center text-gray-300">No flagged products found.</td>
									</tr>
								) : (
									flaggedProducts.map((product, idx) => (
										<tr key={product.Product_URL} className="bg-white hover:bg-gray-50 transition rounded-xl ">
											<td className="px-4 py-3 text-xs text-gray-400 font-semibold rounded-l-xl bg-white">{idx + 1}</td>
											<td className="px-4 py-3 text-xs text-blue-600 underline break-all max-w-xs bg-white">
												<a href={product.Product_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition">Link</a>
											</td>
											{propertyLabels.map((prop) => (
												<td key={prop.key} className="px-2 py-3 text-center">
													{product[prop.key] === true ? (
														<span className="inline-block bg-green-50 text-green-700 px-1 py-1 rounded-full text-xs font-bold shadow-sm">✔</span>
													) : (
														<span className="inline-block bg-red-50 text-red-600 px-1 py-1 rounded-full text-xs font-bold shadow-sm">✘</span>
													)}
												</td>
											))}
											<td className="px-4 py-3 text-center">
												<span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow">{product.compliant_score}</span>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Flagged;
