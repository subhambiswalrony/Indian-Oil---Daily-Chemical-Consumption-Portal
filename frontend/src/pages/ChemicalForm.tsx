import React, { useState, useEffect } from 'react';
import { Info, Calculator, Save, RefreshCw, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DetailsCard from '../components/DetailsCard';

interface FormData {
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
}

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success content */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-800 mb-3"
              >
                Form Submitted Successfully!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6"
              >
                Your chemical management data has been successfully recorded and saved to the system.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Data validation complete</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700 mt-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">SAP integration successful</span>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ChemicalForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    unit: '',
    chemical: '',
    uom: '',
    sapcode: '',
    opening: '',
    receive: '',
    consumption: '',
    closing: '',
    sapbalance: '',
    remarks: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const opening = parseFloat(formData.opening) || 0;
    const receive = parseFloat(formData.receive) || 0;
    const consumption = parseFloat(formData.consumption) || 0;

    const closing = (opening + receive - consumption).toFixed(2);

    setFormData(prev => ({
      ...prev,
      closing,
      sapbalance: closing
    }));
  }, [formData.opening, formData.receive, formData.consumption]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sapcodeRegex = /^SAP\d+$/;
    if (!sapcodeRegex.test(formData.sapcode)) {
      alert("SAP Code must start with 'SAP' followed by numbers (e.g., SAP1001).");
      return;
    }

    const userId = localStorage.getItem('userId'); // ✅ fetch from localStorage

    try {
      const response = await fetch(`${backend_url}/chemical_forms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: userId }), // ✅ attach to payload
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccessModal(true);
        handleClear();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit the form');
    }
  };


  const handleClear = () => {
    setFormData({
      date: '',
      unit: '',
      chemical: '',
      uom: '',
      sapcode: '',
      opening: '',
      receive: '',
      consumption: '',
      closing: '',
      sapbalance: '',
      remarks: ''
    });
  };

  const [showDetailsModal, setShowDetailsModal] = useState(false);


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-6 px-8">
          <div className="flex items-center space-x-3">
            <Calculator className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Daily Chemical Management & Data Entry Panel</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="block text-gray-700 font-medium" htmlFor="date">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="block text-gray-700 font-medium" htmlFor="unit">
                Selected Unit
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="form-input"
                required
              />
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="block text-gray-700 font-medium" htmlFor="chemical">
              Select Chemical
            </label>
            <input
              type="text"
              id="chemical"
              name="chemical"
              value={formData.chemical}
              onChange={handleChange}
              className="form-input"
              required
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="block text-gray-700 font-medium" htmlFor="uom">
                Unit Of Measurement (UOM)
              </label>
              <input
                type="text"
                id="uom"
                name="uom"
                value={formData.uom}
                onChange={handleChange}
                className="form-input"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="block text-gray-700 font-medium" htmlFor="sapcode">
                SAP Material Code
              </label>
              <input
                type="text"
                id="sapcode"
                name="sapcode"
                value={formData.sapcode}
                onChange={handleChange}
                className="form-input"
                required
                pattern="^SAP\d+$"
                title="Must start with 'SAP' followed by numbers (e.g., SAP1001)"
              />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="block text-gray-700 font-medium" htmlFor="opening">
                Opening Balance
              </label>
              <input
                type="number"
                id="opening"
                name="opening"
                value={formData.opening}
                onChange={handleChange}
                placeholder="Input Calculated Field"
                className="form-input"
                required
                step="any"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="block text-gray-700 font-medium" htmlFor="receive">
                Input Received Qty
              </label>
              <input
                type="number"
                id="receive"
                name="receive"
                value={formData.receive}
                onChange={handleChange}
                placeholder="Input Calculated Field"
                className="form-input"
                required
                step="any"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="block text-gray-700 font-medium" htmlFor="consumption">
                Water Consumption Qty
              </label>
              <input
                type="number"
                id="consumption"
                name="consumption"
                value={formData.consumption}
                onChange={handleChange}
                placeholder="Input Calculated Field"
                className="form-input"
                required
                step="any"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label className="block text-gray-700 font-medium" htmlFor="closing">
                  Closing Balance
                </label>
                <input
                  type="number"
                  id="closing"
                  name="closing"
                  value={formData.closing}
                  readOnly
                  className="form-input bg-gray-50"
                  step="any"
                />
              </motion.div>
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Info className="w-4 h-4" />
                <span>Details</span>
              </motion.button>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="block text-gray-700 font-medium" htmlFor="sapbalance">
              SAP Balance
            </label>
            <input
              type="number"
              id="sapbalance"
              name="sapbalance"
              value={formData.sapbalance}
              readOnly
              className="form-input bg-gray-50"
              step="any"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="block text-gray-700 font-medium" htmlFor="remarks">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Enter any remarks..."
              rows={2}
              className="form-input resize-none"
            />
          </motion.div>

          <div className="flex justify-center space-x-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleClear}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Submit</span>
            </motion.button>
          </div>
        </form>
      </motion.div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <DetailsCard
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        opening={formData.opening}
        receive={formData.receive}
        consumption={formData.consumption}
        closing={formData.closing}
      />

    </>
  );
};

export default ChemicalForm;