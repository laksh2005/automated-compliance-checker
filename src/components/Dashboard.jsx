import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { CheckCircle, Package, Flag} from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [complianceScore, setComplianceScore] = useState(0);

  const availabilityData = [
    { name: "Manufacturer Name", value: 43 },
    { name: "Net Quantity", value: 34 },
    { name: "Retail Price", value: 6 },
    { name: "Consumer Care", value: 11 },
    { name: "Country of Origin", value: 14 },
  ];

  const recentSearches = [
    {
      id: 1,
      name: "Organic Green Tea",
      netQuantity: "500g",
      retailPrice: "₹150",
      manufacturer: "ABC Pvt. Ltd.",
      importDate: "2024-08-15",
      countryOfOrigin: "India",
    },
    {
      id: 2,
      name: "Premium Coffee Beans",
      netQuantity: "250g",
      retailPrice: "₹299",
      manufacturer: "XYZ Foods Ltd.",
      importDate: "2024-09-01",
      countryOfOrigin: "Brazil",
    },
    {
      id: 3,
      name: "Himalayan Pink Salt",
      netQuantity: "1kg",
      retailPrice: "₹199",
      manufacturer: "Pure Salt Co.",
      importDate: "2024-08-28",
      countryOfOrigin: "Pakistan",
    },
    {
      id: 4,
      name: "Basmati Rice Premium",
      netQuantity: "5kg",
      retailPrice: "₹599",
      manufacturer: "Golden Grain Ltd.",
      importDate: "2024-09-05",
      countryOfOrigin: "India",
    },
    {
      id: 5,
      name: "Dark Chocolate Bar",
      netQuantity: "100g",
      retailPrice: "₹125",
      manufacturer: "Choco Delights",
      importDate: "2024-08-20",
      countryOfOrigin: "Belgium",
    },
  ];

  useEffect(() => {
    let score = 0;
    const timer = setInterval(() => {
      if (score < 28.9) {
        score += 1;
        setComplianceScore(score);
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="h-screen w-screen bg-white p-4 flex flex-col overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-purple-600 text-white p-3 rounded-xl mb-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Package className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text">
            Automated Compliance Checker for Legal Metrology Declarations
          </h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-gradient-to-br from-red-300 via-red-200 to-red-100 p-4 rounded-xl shadow-md flex flex-col items-center justify-center hover:scale-102 transition-transform"
        >
          <h2 className="text-2xl font-bold text-black mb-4">
            Compliance Score
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <span className="text-5xl font-bold text-gray-800">
              28.9%
            </span>
          </div>
          <div className="mt-4 bg-white/50 rounded-full h-2 w-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `28.9%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-gradient-to-br from-yellow-200 via-amber-100 to-orange-100 p-4 rounded-xl shadow-md hover:scale-102 transition-transform"
        >
          <h2 className="text-2xl font-bold text-black mb-4 text-center">
            Rule Validation
          </h2>
          <div className="space-y-3">
            {[
              { label: "Name", status: "pass" },
              { label: "MRP", status: "fail" },
              { label: "Net Quantity", status: "fail" },
              { label: "Manufacturer", status: "pass" },
              { label: "Country of Origin", status: "pass" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="flex justify-between items-center bg-white/60 p-2 rounded-lg"
              >
                <span className="text-gray-700">{item.label}</span>
                <span
                  className={`w-3 h-3 rounded-full ${
                    item.status === "pass"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-gradient-to-br from-blue-200 via-cyan-100 to-sky-100 p-4 rounded-xl shadow-md hover:scale-102 transition-transform"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Availability of Parameters
          </h2>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={availabilityData}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#4b5563", fontWeight: 500 }}
                  angle={-30}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 14, fill: "#4b5563" }} 
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Bar
                  dataKey="value"
                  fill="url(#blueGradient)"
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-6 rounded-2xl shadow-md w-full max-w-xl flex flex-col justify-between"
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-black mb-4">
        Product Listing Review
      </h2>

      {/* Content */}
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="w-28 h-36 bg-transparent rounded-lg flex items-center justify-center shadow-inner">
          <img
            src="https://m.media-amazon.com/images/I/51KvG-bDAdL.jpg" 
            alt="Organic Green Tea"
            className="object-contain w-full h-full rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-3 text-gray-900">
            Organic Green Tea
          </h3>
          <div className="space-y-1 text-md">
            <p><span className="font-semibold">Name:</span> Organic Green Tea</p>
            <p><span className="font-semibold">MRP:</span> ₹150</p>
            <p><span className="font-semibold">Net Quantity:</span> 500g</p>
            <p><span className="font-semibold">Manufacturer:</span> ABC Pvt. Ltd.</p>
            <p><span className="font-semibold">Country of Origin:</span> India</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-5">
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium">
          <Flag size={16} /> Flag for Action
        </button>
        <button className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg px-4 py-2 text-sm font-medium">
          <CheckCircle size={16} /> Mark as Reviewed
        </button>
      </div>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-gradient-to-br from-green-200 via-emerald-100 to-teal-100 rounded-xl shadow-md hover:scale-102 transition-transform flex flex-col"
        >
          <div className="p-2 bg-gradient-to-r from-green-300/50 to-emerald-300/50 rounded-t-xl">
            <h2 className="text-base font-bold text-black flex items-center gap-2">
              <Package className="w-5 h-5" />
              Recent Searches
            </h2>
          </div>
          <div className="overflow-auto flex-1 p-2">
            <table className="w-full text-md">
              <thead className="bg-gradient-to-r from-green-200/80 to-emerald-200/80 sticky top-0">
                <tr>
                  {["Name", "Net Qty", "Price", "Manufacturer", "Import Date", "Origin"].map((header, idx) => (
                    <th key={idx} className="px-2 py-2 text-left font-semibold text-gray-700 uppercase">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-green-200/30">
                {recentSearches.map((item) => (
                  <tr key={item.id} className="hover:bg-green-100/50 transition">
                    <td className="px-2 py-2 font-semibold text-gray-800">{item.name}</td>
                    <td className="px-2 py-2 text-gray-700">{item.netQuantity}</td>
                    <td className="px-2 py-2 text-gray-700">{item.retailPrice}</td>
                    <td className="px-2 py-2 text-gray-700">{item.manufacturer}</td>
                    <td className="px-2 py-2 text-gray-700">{item.importDate}</td>
                    <td className="px-2 py-2 text-gray-700">{item.countryOfOrigin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
