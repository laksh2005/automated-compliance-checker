import { useState}from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../App.css";
import useData from "../hooks/useData";
import { m } from "framer-motion";

const Dashboard = () => {

  const {Data, flaggedProducts, compliantProducts, nonCompliantProducts, manufacturermissing, netquantitymissing, mrpmissing, consumerCareMissing, manufacturerDateMissing, countryOriginMissing, overrallCompliance}= useData();

  const complianceData = [
    { category: 'Manufacturer', compliance: manufacturermissing.length ? Math.floor(Math.max(0, 100 - (manufacturermissing.length / Data.length) * 100)) : 50 },
    { category: 'Net Quantity', compliance: netquantitymissing.length ? Math.floor(Math.max(0, 100 - (netquantitymissing.length / Data.length) * 100)) : 50 },
    { category: 'MRP', compliance: mrpmissing.length ? Math.floor(Math.max(0, 100 - (mrpmissing.length / Data.length) * 100)) : 50 },
    { category: 'Consumer Care', compliance: consumerCareMissing.length ? Math.floor(Math.max(0, 100 - (consumerCareMissing.length / Data.length) * 100)) : 50 },
    { category: 'Manufacture Date', compliance: manufacturerDateMissing.length ? Math.floor(Math.max(0, 100 - (manufacturerDateMissing.length / Data.length) * 100)) : 50 },
    { category: 'Country Origin', compliance: countryOriginMissing.length ? Math.floor(Math.max(0, 100 - (countryOriginMissing.length / Data.length) * 100)) : 50 },
  ];

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-70 bg-gray-50 border-r border-gray-200 py-6 flex flex-col">
        {/* Logo/Brand */}
        <div className="px-6 mb-8">
          <h2 className="m-0 text-lg font-semibold text-gray-600">
            MAIN NAVIGATION
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-md mb-2">
              <span className="text-base">📊</span>
              <span className="text-sm font-medium">Dashboards</span>
            </div>
            {/* <div className="text-gray-500 text-sm py-2 px-4 hover:text-gray-700 cursor-pointer">Customers</div> */}
            <div className="text-gray-500 text-sm py-2 px-4 hover:text-gray-700 cursor-pointer">Flagged Products</div>
            {/* <div className="text-gray-500 text-sm py-2 px-4 hover:text-gray-700 cursor-pointer">Products</div>
            <div className="text-gray-500 text-sm py-2 px-4 hover:text-gray-700 cursor-pointer">Transactions</div> */}
          </div>
{/* 
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              SEARCH TOOLS
            </h3>
            <div className="text-gray-500 text-sm py-2 px-4 hover:text-gray-700 cursor-pointer">Goals & Target</div>
            <div className="text-gray-500 text-sm py-2 px-4 hover:text-gray-700 cursor-pointer">Sales Performance</div>
            <div className="text-gray-500 text-sm py-2 px-4 hover:text-gray-700 cursor-pointer">Marketing</div>
          </div> */}
        </nav>

        {/* User Profile */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-base font-semibold">
            EL
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">
              Eugene Lamar
            </div>
            <div className="text-xs text-gray-500">
              Help Center
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-auto">
        {/* Header */}
        <div className="bg-white px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="m-0 text-2xl font-semibold text-gray-800 mb-1">
                Automated Compliance Checker
              </h1>
              <p className="m-0 text-sm text-gray-500">
               A detailed overview of products
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Top Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Total  */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-base">�</span>
                </div>
                <span className="text-lg text-gray-500">Total Products</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {Data.length || 0}
              </div>
              <div className="text-xs text-green-600">
                +5.90% from Yesterday
              </div>
            </div>

            {/* Total Compliant */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-base">✓</span>
                </div>
                <span className="text-lg text-gray-500">Compliant</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
              {compliantProducts.length || 0}
              </div>
              <div className="text-xs text-green-600">
                +8.20% from Yesterday
              </div>
            </div>

            {/* Total non compliant */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-base">✗</span>
                </div>
                <span className="text-lg text-gray-500">Non Compliant</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
               {nonCompliantProducts.length || 0}
              </div>
              <div className="text-xs text-green-600">
                +3.20% from Yesterday
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-base">🚩</span>
                </div>
                <span className="text-lg text-gray-500">Flagged for Checking</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {flaggedProducts.length || 0}
              </div>
              <div className="text-xs text-green-600">
                +3.20% from Yesterday
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Orders Analytics */}
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="m-0 text-lg font-semibold">Compliance by Category</h3>
                <div className="flex gap-4 text-xs">
                  <span className="text-blue-600">● Compliance %</span>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={complianceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="category" 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={false}
                      tickLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Compliance']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="compliance" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Compliance Meter */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="m-0 text-lg font-semibold">Overall Compliance</h3>
              </div>
              
              {/* Semi-circle gauge */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-16 mb-4">
                  <svg width="128" height="64" className="transform rotate-0">
                    {/* Background arc */}
                    <path
                      d="M 20 60 A 44 44 0 0 1 108 60"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Dynamic Progress arc */}
                    <path
                      d={(() => {
                        const percentage = Math.max(0, Math.min(100, overrallCompliance || 0));
                        const angle = (percentage / 100) * 180; // 180 degrees for semicircle
                        const radian = (angle * Math.PI) / 180;
                        const x = 64 + 44 * Math.cos(Math.PI - radian);
                        const y = 60 - 44 * Math.sin(Math.PI - radian);
                        const largeArcFlag = angle > 90 ? 1 : 0;
                        return `M 20 60 A 44 44 0 ${largeArcFlag} 1 ${x} ${y}`;
                      })()}
                      fill="none"
                      stroke={(() => {
                        const score = overrallCompliance || 0;
                        if (score >= 80) return "#10b981"; // Green
                        if (score >= 60) return "#f59e0b"; // Yellow/Orange
                        return "#ef4444"; // Red
                      })()}
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Dynamic Needle/Tip */}
                    <line
                      x1="64"
                      y1="60"
                      x2={(() => {
                        const percentage = Math.max(0, Math.min(100, overrallCompliance || 0));
                        const angle = (percentage / 100) * 180;
                        const radian = (angle * Math.PI) / 180;
                        return 64 + 35 * Math.cos(Math.PI - radian);
                      })()}
                      y2={(() => {
                        const percentage = Math.max(0, Math.min(100, overrallCompliance || 0));
                        const angle = (percentage / 100) * 180;
                        const radian = (angle * Math.PI) / 180;
                        return 60 - 35 * Math.sin(Math.PI - radian);
                      })()}
                      stroke="#374151"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Center dot */}
                    <circle
                      cx="64"
                      cy="60"
                      r="3"
                      fill="#374151"
                    />
                  </svg>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-1 ${
                    (overrallCompliance || 0) >= 80 ? 'text-green-600' : 
                    (overrallCompliance || 0) >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {overrallCompliance || 0}%
                  </div>
                  <div className="text-xs text-gray-500 mb-3">Compliance Score</div>
                </div>
                
                {/* Scale markers */}
                <div className="flex justify-between w-32 text-xs text-gray-400 mb-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                
                {/* Status indicators */}
                <div className="mt-2 space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Status</span>
                    <span className={`text-xs font-medium ${
                      (overrallCompliance || 0) >= 80 ? 'text-green-600' : 
                      (overrallCompliance || 0) >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {(overrallCompliance || 0) >= 80 ? 'Excellent' : 
                       (overrallCompliance || 0) >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Last Updated</span>
                    <span className="text-xs text-gray-500">Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="m-0 text-lg font-semibold">Products</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <select className="px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>All Status</option>
                </select>
              </div>
            </div>
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
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                   Harvest Bread
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    50
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    400g
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Harvest Pvt. Ltd.
                  </td>
                  <td className="px-6 py-4">
                    India
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Gaming Chair, local pickup only
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    $5.72
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    453
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    $354.00
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-xl text-xs font-medium">
                      ✓ In Stock
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
