import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import UserWelcome from './components/UserWelcome';

import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ChemicalFormPage from './pages/ChemicalForm';
import ReportPage from './pages/ReportPage';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <main className="pt-[80px] pb-16 pl-[240px] pr-5 sm:pr-10 md:pr-20">
        {children}
      </main>
      <UserWelcome />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Routes>
        {/* Public Route - Login should be default */}
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/chemical-form"
          element={
            <ProtectedLayout>
              <ChemicalFormPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/reportpage"
          element={
            <ProtectedLayout>
              <ReportPage />
            </ProtectedLayout>
          }
        />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
