
import React from "react";
import "../App.css";
import useData from "../hooks/useData";
import { 
  BarChart3, 
  Flag, 
  TrendingUp, 
  FileText, 
  Download, 
  Settings, 
  Building2
} from "lucide-react";

const propertyLabels = [
	// { key: "Image_URL", label: "Image" },
	// { key: "extracted_text", label: "Text Extracted" },
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
	const { Data, flaggedProducts, compliantProducts, nonCompliantProducts, manufacturermissing, netquantitymissing, mrpmissing, consumerCareMissing, manufacturerDateMissing, countryOriginMissing, overrallCompliance, mostcompliant, leastcompliant } = useData();

	// Create a data mapping object to avoid using eval()
	const dataMap = {
		manufacturermissing,
		netquantitymissing,
		mrpmissing,
		consumerCareMissing,
		manufacturerDateMissing,
		countryOriginMissing
	};

	return (
		<div className="flex h-screen font-sans">
			{/* Sidebar */}
			<aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg">
				{/* Logo/Brand */}
				<div className="p-6 border-b border-gray-100">
					<div className="flex items-center gap-3 mb-4">
					<img src="/logo.webp" alt="logo" className="w-10 h-10" />
						<div>
							<h2 className="text-lg font-bold text-gray-900">ComplianceAI</h2>
							<p className="text-xs text-gray-500">Government Dashboard</p>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-6">
					<div className="space-y-2">
						<a href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 font-medium transition-all duration-200">
							<div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
								<BarChart3 size={16} className="text-gray-600" />
							</div>
							<span className="text-sm">Dashboard</span>
						</a>
						<a href="/flagged" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 font-medium transition-all duration-200">
							<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
								<Flag size={16} className="text-blue-600" />
							</div>
							<span className="text-sm">Flagged Products</span>
						</a>
						<a href="/analytics" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 font-medium transition-all duration-200">
							<div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
								<TrendingUp size={16} className="text-gray-600" />
							</div>
							<span className="text-sm">Analytics</span>
						</a>
						<a href="/reports" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 font-medium transition-all duration-200">
							<div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
								<FileText size={16} className="text-gray-600" />
							</div>
							<span className="text-sm">Reports</span>
						</a>
					</div>

					<div className="mt-8">
						<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4 px-4">Tools</h3>
						<div className="space-y-1">
							<a href="/export" className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
								<Download size={14} className="text-gray-600" />
								<span className="text-sm">Export Data</span>
							</a>
							<a href="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
								<Settings size={14} className="text-gray-600" />
								<span className="text-sm">Settings</span>
							</a>
						</div>
					</div>
				</nav>

				{/* User Profile */}
				<div className="p-6 border-t border-gray-100">
					<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
						<div className="relative">
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
								<Building2 size={18} className="text-white" />
							</div>
							<div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
						</div>
						<div className="flex-1 min-w-0">
							<div className="text-sm font-semibold text-gray-900 truncate">Palak Bansal</div>
							<div className="text-xs text-gray-500 truncate">Admin</div>
						</div>
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
								<div className={`text-lg font-bold ${card.text}`}>{dataMap[card.key]?.length || 0}</div>
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
													{product[prop.key] !== "False" ? (
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
