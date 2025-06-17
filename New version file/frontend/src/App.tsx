import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import UserWelcome from './components/UserWelcome';

import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/loginPage';
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
      {/* Sidebar only on medium screens and above */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Adjust main padding based on screen size */}
      <main className="pt-[80px] pb-16 px-4 md:pl-[240px] md:pr-10 transition-all duration-300">
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
        {/* Public Route - Sign Up and Login should be default */}
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
