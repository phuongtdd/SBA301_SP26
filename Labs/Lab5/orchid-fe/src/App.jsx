import "./App.css";
import {
  BrowserRouter as BrowsersRouter,
  Route,
  Routes,
} from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import { OrchidsData } from "./data/OrchidsData.js";
import ListOfOrchids from "./pages/orchids/ListOfOrchids.jsx";
import OrchidDetail from "./pages/orchids/OrchidDetail.jsx";
import Login from "./pages/login/Login.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/home/Home.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
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
                  element={<OrchidDetail />}
                />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowsersRouter>
    </AuthProvider>
  );
}

export default App;
