import { useState } from 'react'
import './App.css'

import Header from "./header";

import Projects from "./Projects";
import Home from "./Home";

export default function App() {

  return (
    <>
      <Header />
      <Projects />
    </>
  )
}