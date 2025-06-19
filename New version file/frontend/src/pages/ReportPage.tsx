import { useState, useEffect } from 'react';
import { Search, Home, ChevronDown, Download, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

type RowType = {
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

const TableRow = ({ row }: { row: RowType }) => (
  <tr className="hover:bg-blue-50 transition-colors duration-200">
    <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-200">{new Date(row.date).toLocaleDateString('en-GB')}</td>
    <td className="px-4 py-3 text-gray-800 border-r border-gray-200">{row.unit}</td>
    <td className="px-4 py-3 text-gray-800 border-r border-gray-200">{row.chemical}</td>
    <td className="px-4 py-3 text-gray-800 border-r border-gray-200">{row.uom}</td>
    <td className="px-4 py-3 text-gray-800 border-r border-gray-200 font-mono text-sm">{row.sapcode}</td>
    <td className="px-4 py-3 text-green-600 font-semibold border-r border-gray-200">{parseFloat(row.opening).toFixed(2)}</td>
    <td className="px-4 py-3 text-blue-600 font-semibold border-r border-gray-200">{parseFloat(row.receive).toFixed(2)}</td>
    <td className="px-4 py-3 text-orange-600 font-semibold border-r border-gray-200">{parseFloat(row.consumption).toFixed(2)}</td>
    <td className="px-4 py-3 text-purple-600 font-semibold border-r border-gray-200">{parseFloat(row.closing).toFixed(2)}</td>
    <td className="px-4 py-3 text-red-600 font-semibold border-r border-gray-200">{parseFloat(row.sapbalance).toFixed(2)}</td>
    <td className="px-4 py-3 text-gray-800 max-w-xs">
      <div className="truncate" title={row.remarks}>{row.remarks}</div>
    </td>
  </tr>
);

function ReportPage() {
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredData, setFilteredData] = useState<RowType[]>([]);
  const [allData, setAllData] = useState<RowType[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [unitOptions, setUnitOptions] = useState<string[]>(['All Units']);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    // Fetch all forms submitted by the user
    fetch(`http://localhost:5000/chemical_forms/${userId}`)
      .then(res => res.json())
      .then(data => {
        setAllData(data);
        setFilteredData(data);
        // setHasSearched(true);
      })
      .catch(err => console.error('Error fetching forms:', err));

    // Fetch distinct unit list for the user
    fetch(`http://localhost:5000/units/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.units)) {
          setUnitOptions(['All Units', ...data.units]);
        } else {
          console.error('Unexpected unit format:', data);
        }
      })
      .catch(err => {
        console.error('Error fetching units:', err);
        setUnitOptions(['All Units']);
      });
  }, [userId]);

  const handleSearch = () => {
    let filtered = allData;

    if (selectedUnit !== 'All Units') {
      filtered = filtered.filter(row => row.unit === selectedUnit);
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter(row => {
        const d = new Date(row.date);
        return d >= from && d <= to;
      });
    }

    setFilteredData(filtered);
    setHasSearched(true);
  };

  const handleReset = () => {
    setSelectedUnit('All Units');
    setFromDate('');
    setToDate('');
    setFilteredData(allData);
    setHasSearched(false);
  };

  const handleExport = () => {
    if (filteredData.length === 0) return;

    const csv = [
      ['Date', 'Unit', 'Chemical', 'UOM', 'SAP Code', 'Opening', 'Received', 'Consumption', 'Closing', 'SAP Balance', 'Remarks'],
      ...filteredData.map(r => [
        r.date, r.unit, r.chemical, r.uom, r.sapcode, r.opening,
        r.receive, r.consumption, r.closing, r.sapbalance, r.remarks
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chemical-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <main className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-xl border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filter Options</h2>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleExport}
                disabled={!hasSearched || filteredData.length === 0}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 shadow-md transition-all ${hasSearched && filteredData.length > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <Link to="/chemical-form">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 shadow-md">
                  <Home className="w-4 h-4" />
                  <span>Data Entry</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">Production Unit</label>
              <div className="relative">
                <select
                  value={selectedUnit}
                  onChange={e => setSelectedUnit(e.target.value)}
                  className="w-full border-2 rounded-lg px-4 py-3 pr-10 text-gray-700 font-medium appearance-none"
                >

                  {unitOptions.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                className="w-full border-2 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                className="w-full border-2 rounded-lg px-4 py-3"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleSearch}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold"
              >
                <Search className="w-4 h-4 inline mr-1" />
                Search
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

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

        {/* Table Section */}
        {hasSearched && (
          <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-gray-200">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {['Date', 'Unit', 'Chemical', 'UOM', 'SAP Code', 'Opening', 'Received', 'Consumption', 'Closing', 'SAP Balance', 'Remarks'].map(col => (
                    <th key={col} className="px-4 py-4 text-left font-bold border-r border-blue-500">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((row, i) => <TableRow key={i} row={row} />)
                ) : (
                  <tr>
                    <td colSpan={11} className="text-center py-16 text-gray-600">No data found for this filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default ReportPage;