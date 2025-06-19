import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, Info } from 'lucide-react';

interface DetailsCardProps {
  isOpen: boolean;
  onClose: () => void;
  opening: string;
  receive: string;
  consumption: string;
  closing: string;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  isOpen,
  onClose,
  opening,
  receive,
  consumption,
  // closing
}) => {
  const openingNum = parseFloat(opening) || 0;
  const receiveNum = parseFloat(receive) || 0;
  const consumptionNum = parseFloat(consumption) || 0;
  const calculatedClosing = openingNum + receiveNum - consumptionNum;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-4 h-4 text-white" />
                    <h3 className="text-sm font-semibold text-white">
                      Closing Balance Details
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Calculation Breakdown */}
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Opening Balance:</span>
                    <span className="font-mono text-gray-800">{openingNum.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span>+ Received Qty:</span>
                    <span className="font-mono">+{receiveNum.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-red-600">
                    <span>- Consumption Qty:</span>
                    <span className="font-mono">-{consumptionNum.toFixed(2)}</span>
                  </div>
                  
                  <hr className="border-gray-300" />
                  
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-gray-800">Closing Balance:</span>
                    <span className="font-mono text-indigo-600">{calculatedClosing.toFixed(2)}</span>
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-amber-800">
                      <p className="font-medium mb-1">Important Note:</p>
                      <p>The closing balance is automatically calculated and represents the remaining chemical quantity at the end of the day. This value will become the opening balance for the next day.</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Got it
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DetailsCard;