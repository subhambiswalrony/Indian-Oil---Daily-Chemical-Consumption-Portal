import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

const UserWelcome: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-16 right-6 z-40"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-3"
      >
        <div className="bg-white/20 p-2 rounded-xl">
          <User className="w-5 h-5" />
        </div>
        <span className="font-medium">Welcome: User</span>
      </motion.div>
    </motion.div>
  );
};

export default UserWelcome;