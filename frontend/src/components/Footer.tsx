import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-2 sm:py-3 fixed bottom-0 left-0 right-0 z-40 shadow-lg"
    >
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-center space-x-2">
          <p className="text-center text-xs sm:text-base">
            <span className="hidden sm:inline">Thanks For Visiting Our Daily Chemical Consumption Entry Page Developed by Indian Oil Department</span>
            <span className="sm:hidden">Indian Oil Department - Chemical Entry System</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;