import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  BrowserRouter as BrowsersRouter,
  Route,
  Routes,
} from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Orchid from "./components/Orchid";
import { OrchidsData } from "./data/OrchidsData.js";
import ListOfOrchids from "./components/ListOfOrchids.jsx";
import TestCount from "./components/TestCount.jsx";
import OrchidDetail from "./components/OrchidDetail.jsx";

function App() {
  return (
    <BrowsersRouter>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<ListOfOrchids orchidsData={OrchidsData} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/detail/:id"
              element={<OrchidDetail orchidsData={OrchidsData} />}
            />{" "}
          </Routes>
        </main>
        <Footer
          avatar="/images/work.jpg"
          name="phuongtdd"
          email="phuongtddde180212@fpt.edu.vn"
        />
      </div>
    </BrowsersRouter>
  );
}

export default App;
