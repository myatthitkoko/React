import { useState } from 'react'

import './App.css'

import { Routes, Route } from "react-router-dom";

import Header from "./header";

import Projects from "./Projects";
import Home from "./Home";

export default function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  )
}
