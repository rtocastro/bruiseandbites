import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  // Hide Header and Footer when on the root path "/"
  const isRoot = location.pathname === '/';

  return (
    <>
      {!isRoot && <Header />}
      <Outlet />
      {!isRoot && <Footer />}
    </>
  );
}

export default App;