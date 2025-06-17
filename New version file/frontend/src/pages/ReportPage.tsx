import React, { useState } from 'react';
import { Search, Home, Calendar, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { Home } from 'lucide-react';

function App() {
  const [selectedUnit, setSelectedUnit] = useState('Unit A');
  const [fromDate, setFromDate] = useState('2025-06-01');
  const [toDate, setToDate] = useState('2025-06-03');

  const sampleData = [
    {
      date: '2025-06-01',
      chemicalName: 'CH003',
      receiveQuantity: 3445,
      consumptionQuantity: 56
    },
    {
      date: '2025-06-01',
      chemicalName: 'Nitric Acid',
      receiveQuantity: 56,
      consumptionQuantity: 78
    },
    {
      date: '2025-06-02',
      chemicalName: 'Sulfuric Acid',
      receiveQuantity: 2890,
      consumptionQuantity: 234
    },
    {
      date: '2025-06-02',
      chemicalName: 'Hydrochloric Acid',
      receiveQuantity: 1250,
      consumptionQuantity: 89
    },
    {
      date: '2025-06-03',
      chemicalName: 'Ammonia',
      receiveQuantity: 4567,
      consumptionQuantity: 345
    }
  ];

  const [filteredData, setFilteredData] = useState(sampleData);

  const handleSearch = () => {
    // Filter data based on date range
    const filtered = sampleData.filter(item => {
      const itemDate = new Date(item.date);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return itemDate >= from && itemDate <= to;
    });
    setFilteredData(filtered);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return now.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      {/* <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Home className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-wide">
                Daily Chemical Consumption Portal
              </h1>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold mb-1">
                Indian Oil Corporation Limited
              </h2>
              <p className="text-orange-100 text-sm font-medium">
                {getCurrentDateTime()}
              </p>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Filter Section */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4 sm:p-6 mb-8 shadow-md border border-blue-200">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:items-center">
            {/* Unit Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-white border-2 border-blue-300 rounded-lg px-4 py-2 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              >
                <option value="Unit A">Unit A</option>
                <option value="Unit B">Unit B</option>
                <option value="Unit C">Unit C</option>
                <option value="Unit D">Unit D</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            {/* Date Range */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full sm:w-auto bg-white border-2 border-blue-300 rounded-lg px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>

              <span className="text-blue-600 font-medium items:center text-sm sm:text-base px-1">to</span>

              <div className="relative w-full sm:w-auto">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full sm:w-auto bg-white border-2 border-blue-300 rounded-lg px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
              <Link to="/chemical-form">
                <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg">
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Data Table - Make Scrollable on Small Screens */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-gray-200">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm">
              <tr>
                <th className="px-4 py-3 text-left font-bold border-r border-blue-500">Date</th>
                <th className="px-4 py-3 text-left font-bold border-r border-blue-500">Chemical Name</th>
                <th className="px-4 py-3 text-left font-bold border-r border-blue-500">Received</th>
                <th className="px-4 py-3 text-left font-bold">Consumed</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900 border-r">{new Date(row.date).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3 text-gray-800 border-r">{row.chemicalName}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold border-r">{row.receiveQuantity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-orange-600 font-semibold">{row.consumptionQuantity.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No data found</div>
              <div className="text-gray-500 text-sm">Try adjusting your search criteria</div>
            </div>
          )}
        </div>
      </main>


      {/* Footer */}
      {/* <footer className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-orange-100 font-medium">
            Thanks you for visiting Our Daily Chemical Consumption Entry Page Developed By IS Department
          </p>
        </div>
      </footer> */}
    </div>
  );
}

export default App;