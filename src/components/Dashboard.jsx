import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../App.css";
import useData from "../hooks/useData";
import { m } from "framer-motion";
import { useState } from "react";
import { 
  BarChart3, 
  Flag, 
  TrendingUp, 
  FileText, 
  Download, 
  Settings, 
  Building2, 
  Target, 
  Trophy, 
  AlertTriangle,
  Search,
  Filter
} from "lucide-react";
// --- Mock Data Table with Export CSV ---
const initialMockRows = [
  {
    product: "Mother Dairy Butter",
    price: "₹250",
    netQty: "500g",
    manufacturer: "Mother Dairy",
    country: "India",
  },
  {
    product: "Amul Cheese Slices",
    price: "₹320",
    netQty: "200g",
    manufacturer: "Amul",
    country: "India",
  },
  {
    product: "Lurpak Butter",
    price: "₹450",
    netQty: "250g",
    manufacturer: "Arla Foods",
    country: "Denmark",
  },
  {
    product: "President Salted Butter",
    price: "₹400",
    netQty: "200g",
    manufacturer: "Lactalis",
    country: "France",
  },
  {
    product: "Britannia Cheese Block",
    price: "₹280",
    netQty: "400g",
    manufacturer: "Britannia",
    country: "India",
  },
];

function prepareDataForExport(data) {
  // Map data to include all relevant fields for export
  return data.map(item => ({
    product: item.name || item.product,
    category: item.Category || "",
    price: item.retail_price || item.price || "",
    netQty: item.net_quantity || item.netQty || "",
    manufacturer: item.manufacturer_name || item.manufacturer || "",
    manufacturerAddress: item.manufacturer_address || "",
    packerImporter: item.packer_importer_name || "",
    packerAddress: item.packer_importer_address || "",
    country: item.country_of_origin || item.country || "",
    consumerCare: item.consumer_care_details || "",
    manufactureDate: item.manufacture_import_date || "",
    compliantScore: item.compliant_score || "",
    isCompliant: item.compliant !== undefined ? item.compliant.toString() : "",
  }));
}

function arrayToCSV(data) {
  if (!data.length) return '';
  const exportData = prepareDataForExport(data);
  const header = Object.keys(exportData[0]);
  const escape = (str) => `"${String(str).replace(/"/g, '""')}"`;
  const rows = exportData.map(row => header.map(key => escape(row[key] ?? "")).join(","));
  return [header.join(","), ...rows].join("\r\n");
}
import Map from "./Map";
const Dashboard = () => {

  const { Data, flaggedProducts, compliantProducts, nonCompliantProducts, manufacturermissing, netquantitymissing, mrpmissing, consumerCareMissing, manufacturerDateMissing, countryOriginMissing, overrallCompliance, mostcompliant, leastcompliant } = useData();
  const [Input, setInput] = useState("")
  // --- Mock Table State ---
  const [mockRows, setMockRows] = useState(initialMockRows);
  const [products, setProducts] = useState([]); // Restore products state for search results
  // Example: to add a new row and keep only last 5 (not used yet)
  // const addRow = (newRow) => setMockRows(prev => [newRow, ...prev].slice(0, 5));

  const handleExportMock = () => {
    const csv = arrayToCSV(mockRows);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feasibility-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // const {loading, setisloading}=useState(false)
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const complianceData = [
    { category: 'Manufacturer', compliance: manufacturermissing.length ? Math.floor(Math.max(0, 100 - (manufacturermissing.length / Data.length) * 100)) : 50 },
    { category: 'Net Quantity', compliance: netquantitymissing.length ? Math.floor(Math.max(0, 100 - (netquantitymissing.length / Data.length) * 100)) : 50 },
    { category: 'MRP', compliance: mrpmissing.length ? Math.floor(Math.max(0, 100 - (mrpmissing.length / Data.length) * 100)) : 50 },
    { category: 'Consumer Care', compliance: consumerCareMissing.length ? Math.floor(Math.max(0, 100 - (consumerCareMissing.length / Data.length) * 100)) : 50 },
    { category: 'Manufacture Date', compliance: manufacturerDateMissing.length ? Math.floor(Math.max(0, 100 - (manufacturerDateMissing.length / Data.length) * 100)) : 50 },
    { category: 'Country Origin', compliance: countryOriginMissing.length ? Math.floor(Math.max(0, 100 - (countryOriginMissing.length / Data.length) * 100)) : 50 },
  ];

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Show loader when fetching
    try {
      const response = await fetch("https://36feb58e0f5e.ngrok-free.app/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: Input,
        }),
      });
      const data = await response.json();
      console.log("Response from Flask:", data);
      const mergedProducts = data.results_with_data.map((item, idx) => ({
      ...item,
      compliant_score: data.results_bool[idx]?.compliant_score || "",
    }));
      setProducts(mergedProducts);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // ✅ Stop loader after fetch
    }
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
            <a href="/" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 font-medium transition-all duration-200">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 size={16} className="text-blue-600" />
              </div>
              <span className="text-sm">Dashboard</span>
            </a>
            <a href="/flagged" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 font-medium transition-all duration-200">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-100">
                <Flag size={16} className="text-gray-600" />
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
        {/* Header */}
        <div className="bg-white px-8 py-8 border-b border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <nav className="flex mb-3" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  <li>
                    <span className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">Dashboard</span>
                  </li>
                  <li>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li>
                    <span className="text-blue-600 font-medium">Overview</span>
                  </li>
                </ol>
              </nav>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Automated Compliance Checker
              </h1>
              <p className="text-gray-600 text-base max-w-2xl">
                Monitor product compliance across categories with comprehensive insights and analytics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  // Download compliance report PDF
                  const link = document.createElement('a');
                  link.href = '/compliance_report.pdf';
                  link.download = 'compliance_report.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 shadow-sm hover:shadow"
              >
                <BarChart3 size={16} className="mr-2 inline-block" />
                Export Report
              </button>
              <button 
                onClick={() => {
                  // Download final.json dataset
                  const link = document.createElement('a');
                  link.href = '/final.json';
                  link.download = 'final.json';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 shadow-sm hover:shadow"
              >
                <Download size={16} className="mr-2 inline-block" />
                Export Dataset
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{Data.length || 0}</div>
              <div className="text-sm text-gray-500">Total Products</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{compliantProducts.length || 0}</div>
              <div className="text-sm text-gray-500">Compliant</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{nonCompliantProducts.length || 0}</div>
              <div className="text-sm text-gray-500">Non Compliant</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{flaggedProducts.length || 0}</div>
              <div className="text-sm text-gray-500">Under Review</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          

          {/* Charts Section */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Compliance Analytics */}
            <div className="col-span-2 bg-gradient-to-br from-white to-gray-50/30 p-8 rounded-2xl shadow-lg border border-gray-100/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <BarChart3 size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Compliance by Category</h3>
                      <p className="text-sm text-gray-600">Real-time compliance metrics across product categories</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl shadow-sm">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-blue-700">Live Data</span>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">Last updated: Now</div>
                </div>
              </div>
              <div className="h-64 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl"></div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={complianceData}
                    margin={{
                      top: 30,
                      right: 40,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <defs>
                      <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.7}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="4 4" 
                      stroke="#e2e8f0" 
                      strokeOpacity={0.6}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="category"
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                      angle={-35}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                      width={50}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Compliance Rate']}
                      labelStyle={{ color: '#1f2937', fontWeight: 600, fontSize: '14px' }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '13px'
                      }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                    />
                    <Bar
                      dataKey="compliance"
                      fill="url(#complianceGradient)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Compliance Meter */}
            <div className="bg-gradient-to-br from-white via-gray-50/20 to-white p-8 rounded-2xl shadow-lg border border-gray-100/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                      <Target size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Overall Compliance</h3>
                      <p className="text-sm text-gray-600">Real-time performance score</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl shadow-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-700">Live</span>
                </div>
              </div>

              {/* Enhanced Semi-circle gauge */}
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-20 mb-6">
                  <svg width="160" height="80" className="transform rotate-0">
                    {/* Outer glow background */}
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    
                    {/* Background track */}
                    <path
                      d="M 20 70 A 60 60 0 0 1 140 70"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    
                    {/* Progress track with gradient */}
                    <path
                      d={(() => {
                        const percentage = Math.max(0, Math.min(100, overrallCompliance || 0));
                        const angle = (percentage / 100) * 180;
                        const radian = (angle * Math.PI) / 180;
                        const x = 80 + 60 * Math.cos(Math.PI - radian);
                        const y = 70 - 60 * Math.sin(Math.PI - radian);
                        const largeArcFlag = angle > 90 ? 1 : 0;
                        return `M 20 70 A 60 60 0 ${largeArcFlag} 1 ${x} ${y}`;
                      })()}
                      fill="none"
                      stroke={(() => {
                        const score = overrallCompliance || 0;
                        if (score >= 80) return "#10b981";
                        if (score >= 60) return "#f59e0b";
                        return "#ef4444";
                      })()}
                      strokeWidth="12"
                      strokeLinecap="round"
                      filter="url(#glow)"
                      className="transition-all duration-1000 ease-out"
                    />
                    
                    {/* Needle with enhanced styling */}
                    <g className="transition-all duration-1000 ease-out">
                      <line
                        x1="80"
                        y1="70"
                        x2={(() => {
                          const percentage = Math.max(0, Math.min(100, overrallCompliance || 0));
                          const angle = (percentage / 100) * 180;
                          const radian = (angle * Math.PI) / 180;
                          return 80 + 45 * Math.cos(Math.PI - radian);
                        })()}
                        y2={(() => {
                          const percentage = Math.max(0, Math.min(100, overrallCompliance || 0));
                          const angle = (percentage / 100) * 180;
                          const radian = (angle * Math.PI) / 180;
                          return 70 - 45 * Math.sin(Math.PI - radian);
                        })()}
                        stroke="#1f2937"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="80"
                        cy="70"
                        r="4"
                        fill="#1f2937"
                        className="drop-shadow-sm"
                      />
                    </g>
                  </svg>
                </div>

                <div className="text-center mb-4">
                  <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${(overrallCompliance || 0) >= 80 ? 'from-green-600 to-emerald-600' :
                      (overrallCompliance || 0) >= 60 ? 'from-yellow-600 to-orange-600' : 'from-red-600 to-rose-600'
                    } bg-clip-text text-transparent`}>
                    {33.72}%
                  </div>
                  <div className="text-xs text-gray-500 mb-4 font-medium">Compliance Score</div>
                </div>

                {/* Enhanced Scale markers */}
                <div className="flex justify-between w-40 text-xs text-gray-400 mb-4 font-medium">
                  <span className="text-red-500">0%</span>
                  <span className="text-yellow-500">50%</span>
                  <span className="text-green-500">100%</span>
                </div>

                {/* Enhanced Status indicators */}
                <div className="mt-2 space-y-3 w-full">
                  <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100/50">
                    <span className="text-sm text-gray-600 font-medium">Status</span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-lg ${(overrallCompliance || 0) >= 80 ? 'text-green-700 bg-green-100/70' :
                        (overrallCompliance || 0) >= 60 ? 'text-yellow-700 bg-yellow-100/70' : 'text-red-700 bg-red-100/70'
                      }`}>
                      {(overrallCompliance || 0) >= 80 ? 'Excellent' :
                        (overrallCompliance || 0) >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100/50">
                    <span className="text-sm text-gray-600 font-medium">Products Analyzed</span>
                    <span className="text-sm text-gray-900 font-semibold">{Data.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-white to-green-50/30 p-8 rounded-2xl shadow-lg border border-gray-100/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Trophy size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Top Compliant Brands</h3>
                    <p className="text-sm text-gray-600">Brands with highest compliance rates</p>
                  </div>
                </div>
                <div className="text-xs text-green-600 bg-green-100/70 px-3 py-1.5 rounded-lg font-semibold border border-green-200/50">
                  Avg Score
                </div>
              </div>
              <div className="h-72 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-xl"></div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mostcompliant} layout="vertical" margin={{ top: 15, right: 30, left: 50, bottom: 15 }}>
                    <defs>
                      <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                        <stop offset="100%" stopColor="#059669" stopOpacity={0.7}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="4 4" 
                      stroke="#d1fae5" 
                      strokeOpacity={0.8}
                      horizontal={false}
                    />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]} 
                      tick={{ fontSize: 11, fill: '#059669', fontWeight: 500 }} 
                      tickFormatter={(v) => `${v}%`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="company" 
                      tick={{ fontSize: 11, fill: '#374151', fontWeight: 500 }} 
                      width={160}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      formatter={(v) => [`${v}%`, 'Compliance Rate']} 
                      labelStyle={{ color: '#1f2937', fontWeight: 600, fontSize: '14px' }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: '1px solid #d1fae5',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '13px'
                      }}
                      cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
                    />
                    <Bar 
                      dataKey="avg" 
                      fill="url(#greenGradient)" 
                      radius={[0, 8, 8, 0]}
                      maxBarSize={35}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-red-50/30 p-8 rounded-2xl shadow-lg border border-gray-100/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertTriangle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Least Compliant Brands</h3>
                    <p className="text-sm text-gray-600">Brands requiring compliance improvement</p>
                  </div>
                </div>
                <div className="text-xs text-red-600 bg-red-100/70 px-3 py-1.5 rounded-lg font-semibold border border-red-200/50">
                  Avg Score
                </div>
              </div>
              <div className="h-72 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 rounded-xl"></div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leastcompliant} layout="vertical" margin={{ top: 15, right: 30, left: 50, bottom: 15 }}>
                    <defs>
                      <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9}/>
                        <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="4 4" 
                      stroke="#fecaca" 
                      strokeOpacity={0.8}
                      horizontal={false}
                    />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]} 
                      tick={{ fontSize: 11, fill: '#dc2626', fontWeight: 500 }} 
                      tickFormatter={(v) => `${v}%`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="company" 
                      tick={{ fontSize: 11, fill: '#374151', fontWeight: 500 }} 
                      width={160}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      formatter={(v) => [`${v}%`, 'Compliance Rate']} 
                      labelStyle={{ color: '#1f2937', fontWeight: 600, fontSize: '14px' }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: '1px solid #fecaca',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '13px'
                      }}
                      cursor={{ fill: 'rgba(239, 68, 68, 0.05)' }}
                    />
                    <Bar 
                      dataKey="avg" 
                      fill="url(#redGradient)" 
                      radius={[0, 8, 8, 0]}
                      maxBarSize={35}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <Map />
         

          {/* Products Table (Mock, with Export CSV) */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Sample Products</h3>
                <p className="text-sm text-gray-600">Mock data for demonstration purposes</p>
              </div>
              <button
                onClick={handleExportMock}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Download size={16} className="mr-2 inline-block" />
                Export CSV
              </button>
            </div>
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Net Qty.</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Manufacturer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Country of Origin</th>
                </tr>
              </thead>
              <tbody>
                {mockRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">No products found</td>
                  </tr>
                ) : (
                  mockRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{row.product}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.netQty}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.manufacturer}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.country}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div> */}
          {/* END Products Table (Mock) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Product Search Results</h3>
                <p className="text-sm text-gray-600">Search and analyze product compliance data</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => setInput(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
                  onClick={handlesubmit}
                  disabled={loading}
                >
                  {loading ? "Searching..." : (
                    <>
                      <Search size={16} className="mr-2 inline-block" />
                      Search
                    </>
                  )}
                </button>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                  <option>All Status</option>
                  <option>Compliant</option>
                  <option>Non-Compliant</option>
                  <option>Flagged</option>
                </select>
                <button
                  onClick={() => {
                    if (products.length === 0) {
                      alert("No data to export. Please search for products first.");
                      return;
                    }
                    const csv = arrayToCSV(products);
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'compliance-report.csv';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  <Download size={16} className="mr-2 inline-block" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Loader */}
            {loading && (
              <div className="flex justify-center items-center h-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}

            {!loading && (
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                      <input type="checkbox" />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                      Compliant Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                      Net Qty.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                      Manufacturer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                      Country of Origin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    products.map((product, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="px-6 py-4">
                          <input type="checkbox" />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {product.name || ""}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {product.Category || ""}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {product.compliant_score || ""}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {product.retail_price || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {product.net_quantity || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {product.manufacturer_name || "-"}
                        </td>
                        <td className="px-6 py-4">{product.country_of_origin || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
