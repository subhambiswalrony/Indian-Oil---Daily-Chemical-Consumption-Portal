import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChemicalForm from './components/ChemicalForm';
import Footer from './components/Footer';
import UserWelcome from './components/UserWelcome';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Sidebar />
      
      <main className="pt-[80px] pb-16 pl-[240px] pr-5 sm:pr-10 md:pr-20">
        <div className="max-w-4xl mx-auto my-8">
          <ChemicalForm />
        </div>
      </main>
      
      <UserWelcome />
      <Footer />
    </div>
  );
}

export default App;