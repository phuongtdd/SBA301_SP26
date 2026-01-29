import React from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
export default function FilterSort({
  categories,
  onFilterChange,
  onSortChange,
}) {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <Form>
      <Row className="g-2 g-sm-3">
        <Col xs={12} sm={12} md={6} lg={6}>
          <Form.Group controlId="filterSelect">
            <Form.Label>Filter by Category:</Form.Label>
            <Form.Control as="select" onChange={handleFilterChange}>
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Form.Group controlId="sortSelect">
            <Form.Label>Sort by:</Form.Label>
            <Form.Control as="select" onChange={handleSortChange}>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
