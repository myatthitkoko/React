import { useState } from 'react'

import './App.css'

import { Routes, Route } from "react-router-dom";

import Header from "./components/header";

import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from './components/NotFound';

export default function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
