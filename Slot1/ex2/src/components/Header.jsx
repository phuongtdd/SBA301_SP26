import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import About from "./About";
import Contact from "./Contact";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as = {Link} to="/">Home</Nav.Link>
            <Nav.Link as = {Link} to="/features">Features</Nav.Link>
            <Nav.Link as = {Link} to="/pricing">Pricing</Nav.Link>
            <Nav.Link as = {Link} to="/about">About</Nav.Link>
            <Nav.Link as = {Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1>Welcome to My App</h1>
    </header>
  );
}
