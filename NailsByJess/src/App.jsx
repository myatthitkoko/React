import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Home'
import BookingPage from './pages/Booking'
import Header from './components/Header'
import NotFound from './components/NotFound';

function App() {

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
