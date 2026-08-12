import { Routes, Route } from "react-router-dom";

import Thanks from "./Thanks.jsx";
import Home from "./Home.jsx";

export default function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </>
  )
}
