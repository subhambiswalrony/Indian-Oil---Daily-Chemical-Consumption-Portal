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
      <main className="container mx-auto px-6 py-8">
        {/* Filter Section */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 mb-8 shadow-md border border-blue-200">
          <div className="flex flex-wrap items-center gap-4">
            {/* Unit Dropdown */}
            <div className="relative">
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="appearance-none bg-white border-2 border-blue-300 rounded-lg px-4 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm min-w-[120px]"
              >
                <option value="Unit A">Unit A</option>
                <option value="Unit B">Unit B</option>
                <option value="Unit C">Unit C</option>
                <option value="Unit D">Unit D</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            {/* Date Range */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="bg-white border-2 border-blue-300 rounded-lg px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
              <span className="text-blue-600 font-medium">to</span>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-white border-2 border-blue-300 rounded-lg px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>

            {/* Home Button */}
            <Link to="/chemical-form">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r border-blue-500">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r border-blue-500">
                    Chemical Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r border-blue-500">
                    Receive Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Consumption Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-blue-50 transition-colors duration-150`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      {new Date(row.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      {row.chemicalName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 border-r border-gray-200">
                      {row.receiveQuantity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">
                      {row.consumptionQuantity.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No data found</div>
              <div className="text-gray-500 text-sm">Try adjusting your search criteria</div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Chemicals</h3>
            <p className="text-3xl font-bold">{filteredData.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Received</h3>
            <p className="text-3xl font-bold">
              {filteredData.reduce((sum, item) => sum + item.receiveQuantity, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Consumed</h3>
            <p className="text-3xl font-bold">
              {filteredData.reduce((sum, item) => sum + item.consumptionQuantity, 0).toLocaleString()}
            </p>
          </div>
        </div> */}
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