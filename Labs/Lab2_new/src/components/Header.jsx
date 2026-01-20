import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import CarouselBanner from "./CarouselBanner";
import SearchBar from "./SearchBar";
import { useLoginContext } from "../context/LoginContext";

export default function Header({ searchValue = "", onSearchChange }) {
  const { user, isAuthenticated, logout } = useLoginContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <CarouselBanner />
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
        <Container fluid className="px-2 px-sm-3 px-md-4">
          <Navbar.Brand href="#home" className="fw-bold">Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="./features">
                Features
              </Nav.Link>
              <Nav.Link as={Link} to="./pricing">
                Pricing
              </Nav.Link>
              <Nav.Link as={Link} to="./about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="./contact">
                Contact
              </Nav.Link>
            </Nav>
            <SearchBar
              searchValue={searchValue}
              onSearchChange={onSearchChange}
            />
            {/* Hiển thị user info và nút logout */}
            {isAuthenticated && user && (
              <div className="d-flex align-items-center ms-3">
                <span className="text-light me-3">
                  Xin chào, <strong>{user.username}</strong>
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
