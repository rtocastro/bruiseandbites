import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Entry from "./pages/Entry";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Mission from "./pages/Mission";
import Contact from "./pages/Contact";
import Request from "./pages/Request";

function App() {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <>
      {!isRoot && <Header />}

      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
      </Routes>

      {!isRoot && <Footer />}
    </>
  );
}

export default App;