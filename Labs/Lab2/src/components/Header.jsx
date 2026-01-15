import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import About from "./About";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import CarouselBanner from "./CarouselBanner";
import SearchBar from "./SearchBar";

export default function Header({ searchValue = "", onSearchChange }) {
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
