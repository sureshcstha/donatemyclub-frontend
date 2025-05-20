import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import DonationForm from './pages/DonationForm';
import AboutClub from './pages/AboutClub';
import TestCardInfo from './pages/TestCardInfo'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow bg-background py-12 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate/:clubId" element={<DonationForm />} />
            <Route path="/about/:clubId" element={<AboutClub />} />
            <Route path="/test-cards" element={<TestCardInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App