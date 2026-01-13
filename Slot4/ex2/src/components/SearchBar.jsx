import React from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({ searchValue = "", onSearchChange }) {
  const handleChange = (e) => onSearchChange(e.target.value);
  return (
    <Form className="mb-3">
      <Form.Group controlId="searchInput">
        <Form.Label>Search by name:</Form.Label>
        <Form.Control
          type="search"
          placeholder="Enter orchid name..."
          value={searchValue}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
}