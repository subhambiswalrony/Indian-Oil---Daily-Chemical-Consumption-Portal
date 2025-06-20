import React, { useState, useEffect } from 'react';
import {
  Bell,
  User,
  Menu,
  X,
  Clock,
  Building2,
  ClipboardList,
  Settings,
  LogOut,
  Building
}
  from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
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

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <motion.header
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50 h-[60px] sm:h-[72px]"
      >
        <div className="flex items-center justify-between h-full px-2 sm:px-4 lg:px-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={toggleMobileSidebar}
              className="md:hidden p-1 hover:bg-blue-700 rounded transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo & Titles */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 sm:space-x-3">
              {/* Logo Circle */}
              <div className="bg-white p-1 rounded-full shadow-md flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg"
                  alt="IOCL Logo"
                  className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
                />
              </div>

              {/* Text only visible on sm+ screens */}
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm sm:text-base lg:text-lg xl:text-xl text-white leading-tight">
                  Indian Oil Corporation Limited
                </h1>
                <p className="text-[10px] sm:text-xs text-orange-100 leading-snug">
                  Chemical Management System
                </p>
              </div>
            </motion.div>
          </div>

          {/* Paradeep & Time */}
          <motion.div
            className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl"
            style={{ transformOrigin: 'center' }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-sm font-semibold">Paradip Refinery</span>
          </motion.div>

          {/* Right: Date & Time */}
          <motion.div
            className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl"
            whileHover={{ scale: 1.02 }}
          >
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">{dateTime}</span>
          </motion.div>

          {/* User Icons */}
          {/* <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-1 sm:p-2 hover:bg-blue-700 rounded-full transition-colors"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-1 sm:p-2 hover:bg-blue-700 rounded-full transition-colors"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div> */}
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100] md:hidden"
              onClick={toggleMobileSidebar}
            />

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="bg-gradient-to-b from-blue-600 to-blue-800 fixed left-0 top-0 h-full w-[280px] text-white shadow-xl z-[110] overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-blue-700">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg"
                    alt="IOCL Logo"
                    className="w-8 h-8"
                  />

                  <span className="font-semibold">Indian Oil Corporation Limited</span>

                </div>
                <button
                  onClick={toggleMobileSidebar}
                  className="p-1 hover:bg-blue-700 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="py-4">
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/reportpage"
                      className="flex items-center gap-x-4 px-4 py-3 hover:bg-blue-700 transition-colors"
                      onClick={toggleMobileSidebar}
                    >
                      <ClipboardList className="w-5 h-5" />
                      <span>Report Page</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-x-4 px-4 py-3 hover:bg-blue-700 transition-colors"
                      onClick={toggleMobileSidebar}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/login"
                      className="flex items-center gap-x-4 px-4 py-3 hover:bg-blue-700 transition-colors"
                      onClick={toggleMobileSidebar}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Log out</span>
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="absolute bottom-4 left-0 w-full px-4 flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-lg mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg"
                    alt="IOCL Logo"
                    className="w-10 h-10"
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium text-white/90 text-sm">Indian Oil Corporation Limited</p>
                  <p className="text-xs text-white/80">(Paradeep Refinery)</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
