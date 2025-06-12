import React from 'react';
import { ClipboardList, Settings, LogOut, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const sidebarItems = [
    { icon: ClipboardList, text: 'Report Page', path: '/reportpage' },
    { icon: Settings, text: 'Settings' },
    { icon: LogOut, text: 'Logout' }
  ];

  return (
    <motion.aside
      initial={{ x: -220 }}
      animate={{ x: 0 }}
      className="bg-gradient-to-b from-blue-600 to-blue-800 fixed left-0 top-[72px] h-[calc(100vh-72px)] w-[220px] text-white shadow-xl z-40 overflow-y-auto"
    >
      <nav className="py-6">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <motion.li key={index} whileHover={{ x: 10 }}>
              <Link to={item.path || '#'}
                    className="flex items-center px-4 py-2 hover:bg-blue-700 rounded-lg transition"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.text}</span>
              </Link>
            </motion.li>

          ))}
        </ul>
      </nav>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-24 left-0 w-full px-4 flex flex-col items-center"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white p-3 rounded-full shadow-lg mb-4"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg"
            alt="IOCL Logo"
            className="w-12 h-12"
          />
        </motion.div>
        <div className="text-center space-y-1">
          <p className="font-medium text-white/90">Indian Oil Corporation Limited</p>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Building className="w-4 h-4" />
            <p>(Paradip Refinery)</p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;