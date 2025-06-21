import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

const backend_url = import.meta.env.VITE_BACKEND_URL;

const UserWelcome: React.FC = () => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setLoading(false);
      setFirstName(null);
      return;
    }

    fetch(`${backend_url}/user/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then(data => {
        setFirstName(data.firstName || null);
      })
      .catch(err => {
        console.error(err);
        setFirstName(null);
      })
      .finally(() => setLoading(false));
  }, []); // run once on mount

  if (loading) return null; // or a spinner component

  if (!firstName) return null; // or show generic welcome or login prompt

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-12 sm:bottom-16 right-2 sm:right-6 z-40"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg flex items-center space-x-2 sm:space-x-3"
      >
        <div className="bg-white/20 p-1 sm:p-2 rounded-xl">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <span className="font-medium text-sm sm:text-base">
          <span className="hidden sm:inline">Welcome: {firstName}</span>
          <span className="sm:hidden">{firstName}</span>
        </span>
      </motion.div>
    </motion.div>
  );
};

export default UserWelcome;