import React, { useState, useEffect } from 'react';
import { Clock, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const dateStr = now.toLocaleDateString('en-GB', options);
      const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setDateTime(`${dateStr}, ${timeStr}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-4 px-6 fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-white p-2 rounded-full shadow-md">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg"
              alt="IOCL Logo"
              className="w-8 h-8"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold hidden md:block">
              Indian Oil Corporation Limited
            </h1>
            <h1 className="text-2xl font-bold md:hidden">IOCL</h1>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <Building2 className="w-5 h-5" />
          <span className="text-lg font-semibold">(Paradip Refinery)</span>
        </motion.div>

        <motion.div
          className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <Clock className="w-5 h-5" />
          <span className="text-sm md:text-base font-medium">{dateTime}</span>
        </motion.div>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold text-sm md:text-base"
          >
            Sign Out
          </motion.button>
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;