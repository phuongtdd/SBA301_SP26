
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter as BrowsersRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <BrowsersRouter>
    <Header />
    <Routes>
        <Route path="/" element={<div>Trang chủ</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    <Footer />
    </BrowsersRouter>
  );
}

export default App
