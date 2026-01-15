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
import Login from "./components/Login.jsx";
import MainLayout from "./components/MainLayout.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <BrowsersRouter>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<MainLayout />}>
              <Route
                index
                element={<Home />}
              />
              <Route
                path="list"
                element={<ListOfOrchids orchidsData={OrchidsData} />}
              />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route
                path="detail/:id"
                element={<OrchidDetail orchidsData={OrchidsData} />}
              />{" "}
            </Route>
          </Routes>
        </main>
      </div>
    </BrowsersRouter>
  );
}

export default App;
