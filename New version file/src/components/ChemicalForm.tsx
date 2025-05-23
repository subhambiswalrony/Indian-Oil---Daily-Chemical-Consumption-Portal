import React, { useState, useEffect } from 'react';
import { Info, Calculator, Save, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted successfully!');
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

  return (
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
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
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

        <div className="flex justify-end space-x-4 pt-4">
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
  );
};

export default ChemicalForm;