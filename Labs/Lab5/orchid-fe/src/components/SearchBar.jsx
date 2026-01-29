import React from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({ searchValue = "", onSearchChange }) {
  const handleChange = (e) => onSearchChange(e.target.value);
  return (
    <Form className="mb-2 mb-lg-0" style={{ minWidth: "180px", maxWidth: "280px" }}>
      <Form.Group controlId="searchInput" className="mb-0">
        <Form.Control
          type="search"
          placeholder="Enter orchid name..."
          value={searchValue}
          onChange={handleChange}
          size="sm"
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #ced4da",
            borderRadius: "5px",
            color: "#0d0d0d"
          }}
        />
      </Form.Group>
    </Form>
  );
}