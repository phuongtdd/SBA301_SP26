
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter as BrowsersRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Orchid from './components/Orchid'

function App() {
  return (
    <BrowsersRouter>
      <div className="app-container">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/"/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Orchid />

        <Footer avatar="/images/work.jpg" name="phuongtdd" email="phuongtddde180212@fpt.edu.vn" />
      </div>
    </BrowsersRouter>
  );
}

export default App
