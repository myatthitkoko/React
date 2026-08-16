import { BrowserRouter, Routes, Route } from "react-router-dom";

import Thanks from "./Thanks.jsx";
import Home from "./Home.jsx";
import Reservation from "./Reservation.jsx";

export default function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Reservation />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
    </>
  )
}
