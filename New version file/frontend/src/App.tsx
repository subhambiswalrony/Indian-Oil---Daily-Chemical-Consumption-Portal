import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import UserWelcome from './components/UserWelcome';

import ChemicalFormPage from './pages/ChemicalForm';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Sidebar />
      <main className="pt-[80px] pb-16 pl-[240px] pr-5 sm:pr-10 md:pr-20">
        <Routes>
          <Route path="/" element={<ChemicalFormPage />} />
          <Route path="/reportpage" element={<ReportPage />} />
        </Routes>
      </main>
      <UserWelcome />
      <Footer />
    </div>
  );
}

export default App;
