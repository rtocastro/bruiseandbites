import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

import Entry from "./pages/Entry";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Mission from "./pages/Mission";
import Contact from "./pages/Contact";
import Request from "./pages/Request";
import Order from "./pages/Order";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <div className="app-shell">
      {!isRoot && <Header onCartOpen={() => setIsCartOpen(true)} />}

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={<Request />} />
          <Route path="*" element={<Entry />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>

      {!isRoot && <Footer />}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;