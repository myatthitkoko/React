import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from './pages/Home'
import BookingPage from './pages/Booking'
import Header from './components/Header'
import NotFound from './components/NotFound';
import { useEffect } from 'react';

function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
