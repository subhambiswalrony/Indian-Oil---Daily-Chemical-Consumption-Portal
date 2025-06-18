import { useState } from 'react';
import { Search, Home, ChevronDown, Download, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// TableRow Component for rendering a row
type TableRowProps = {
  row: {
    date: string;
    unit: string;
    chemical: string;
    uom: string;
    sapcode: string;
    opening: string;
    receive: string;
    consumption: string;
    closing: string;
    sapbalance: string;
    remarks: string;
  };
};

const TableRow = ({ row }: TableRowProps) => {
  return (
    <tr className="hover:bg-blue-50 transition-colors duration-200">
      <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-200">
        {new Date(row.date).toLocaleDateString('en-GB')}
      </td>
      <td className="px-4 py-3 text-gray-800 border-r border-gray-200">{row.unit}</td>
      <td className="px-4 py-3 text-gray-800 border-r border-gray-200">{row.chemical}</td>
      <td className="px-4 py-3 text-gray-800 border-r border-gray-200">{row.uom}</td>
      <td className="px-4 py-3 text-gray-800 border-r border-gray-200 font-mono text-sm">{row.sapcode}</td>
      <td className="px-4 py-3 text-green-600 font-semibold border-r border-gray-200">
        {parseFloat(row.opening).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-blue-600 font-semibold border-r border-gray-200">
        {parseFloat(row.receive).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-orange-600 font-semibold border-r border-gray-200">
        {parseFloat(row.consumption).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-purple-600 font-semibold border-r border-gray-200">
        {parseFloat(row.closing).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-red-600 font-semibold border-r border-gray-200">
        {parseFloat(row.sapbalance).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-gray-800 max-w-xs">
        <div className="truncate" title={row.remarks}>
          {row.remarks}
        </div>
      </td>
    </tr>
  );
};

function ReportPage() {
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

   const sampleData = [
    {
      date: '2025-06-18',
      unit: 'Unit D',
      chemical: 'Neon',
      uom: 'Meter',
      sapcode: '236985',
      opening: '2.65',
      receive: '6.32',
      consumption: '26.14',
      closing: '-17.17',
      sapbalance: '-17.17',
      remarks: 'Critical shortage - urgent restocking required',
    },
    {
      date: '2025-06-18',
      unit: 'Unit A',
      chemical: 'Hydrogen',
      uom: 'Litre',
      sapcode: '235489',
      opening: '4.45',
      receive: '10.20',
      consumption: '7.80',
      closing: '6.85',
      sapbalance: '6.85',
      remarks: 'First data of Hydrogen - normal consumption',
    },
    {
      date: '2025-06-18',
      unit: 'Unit B',
      chemical: 'Oxygen',
      uom: 'Ton',
      sapcode: '234567',
      opening: '1.10',
      receive: '5.25',
      consumption: '4.20',
      closing: '2.15',
      sapbalance: '2.15',
      remarks: 'Oxygen consumption data - within limits',
    },
    {
      date: '2025-06-18',
      unit: 'Unit C',
      chemical: 'Argon',
      uom: 'Kg',
      sapcode: '245678',
      opening: '3.00',
      receive: '7.50',
      consumption: '3.80',
      closing: '6.70',
      sapbalance: '6.70',
      remarks: 'Argon data for consumption - optimal levels',
    },
    {
      date: '2025-06-17',
      unit: 'Unit A',
      chemical: 'Helium',
      uom: 'Cubic Meter',
      sapcode: '234890',
      opening: '12.45',
      receive: '8.75',
      consumption: '15.20',
      closing: '6.00',
      sapbalance: '6.00',
      remarks: 'Helium usage for testing equipment',
    },
    {
      date: '2025-06-17',
      unit: 'Unit B',
      chemical: 'Nitrogen',
      uom: 'Ton',
      sapcode: '256789',
      opening: '25.30',
      receive: '15.00',
      consumption: '18.50',
      closing: '21.80',
      sapbalance: '21.80',
      remarks: 'Nitrogen for inert atmosphere maintenance',
    },
  ];

  const [filteredData, setFilteredData] = useState<typeof sampleData>([]);

  const handleSearch = () => {
    let filtered = sampleData;

    // Filter by unit
    if (selectedUnit !== 'All Units') {
      filtered = filtered.filter(item => item.unit === selectedUnit);
    }

    // Filter by date range
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= from && itemDate <= to;
      });
    }

    setFilteredData(filtered);
    setHasSearched(true);
  };

  const handleReset = () => {
    setSelectedUnit('All Units');
    setFromDate('');
    setToDate('');
    setFilteredData([]);
    setHasSearched(false);
  };

  const handleExport = () => {
    if (filteredData.length === 0) return;

    const csvContent = [
      ['Date', 'Unit', 'Chemical', 'UOM', 'SAP Code', 'Opening', 'Received', 'Consumption', 'Closing', 'SAP Balance', 'Remarks'],
      ...filteredData.map(row => [
        row.date, row.unit, row.chemical, row.uom, row.sapcode,
        row.opening, row.receive, row.consumption, row.closing, row.sapbalance, row.remarks
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chemical-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-xl border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            {/* Filter Options Heading */}
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filter Options</h2>
            </div>

            {/* Export CSV and Data Entry Buttons */}
            <div className="flex space-x-4">
              {/* Export CSV Button */}
              <button
                onClick={handleExport}
                disabled={!hasSearched || filteredData.length === 0}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg ${hasSearched && filteredData.length > 0
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>

              {/* Data Entry Button */}
              <Link to="/chemical-form">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg">
                  <Home className="w-4 h-4" />
                  <span>Data Entry</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Unit Dropdown */}
            <div className="relative">
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                Production Unit
              </label>
              <div className="relative">
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:border-gray-400 transition-colors"
                  id="unit"
                >
                  <option value="All Units">All Units</option>
                  <option value="Unit A">Unit A</option>
                  <option value="Unit B">Unit B</option>
                  <option value="Unit C">Unit C</option>
                  <option value="Unit D">Unit D</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* From Date */}
            <div>
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:border-gray-400 transition-colors"
              />
            </div>

            {/* To Date */}
            <div>
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:border-gray-400 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleSearch}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Message - Show when no search has been performed */}
        {!hasSearched && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-orange-100 p-8 rounded-full">
                <Search className="w-16 h-16 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">IOCL Chemical Inventory Reports</h3>
                <p className="text-gray-600 text-lg mb-4">
                  Use the filter options above to search and view chemical inventory data
                </p>
                <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-orange-600 text-sm">
                    💡 <strong>Tip:</strong> Select a production unit or date range, then click "Search" to view the data table
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Table - Only show after search */}
        {hasSearched && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">Date</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">Unit</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">Chemical</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">UOM</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">SAP Code</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">Opening</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">Received</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">Consumption</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">Closing</th>
                    <th className="px-4 py-4 text-left font-bold border-r border-blue-500">SAP Balance</th>
                    <th className="px-4 py-4 text-left font-bold">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => <TableRow key={index} row={row} />)
                  ) : (
                    <tr>
                      <td colSpan={11} className="text-center py-16">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="bg-gray-100 p-8 rounded-full">
                            <Search className="w-12 h-12 text-gray-400" />
                          </div>
                          <div>
                            <div className="text-gray-900 text-xl font-semibold mb-2">No data found</div>
                            <div className="text-gray-500">Try adjusting your search criteria or date range</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ReportPage;
