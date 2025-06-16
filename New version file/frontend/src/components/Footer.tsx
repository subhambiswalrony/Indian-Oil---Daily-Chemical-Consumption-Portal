import React from 'react';
// import { Code } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-3 fixed bottom-0 left-0 right-0 z-40 shadow-lg"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-2">
          {/* <Code className="w-5 h-5" /> */}
          <p className="text-center">
            Thanks For Visiting Our Daily Chemical Consumption Entry Page Developed by IS Department
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;