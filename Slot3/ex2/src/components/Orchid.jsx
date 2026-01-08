import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

export default function Orchid({ orchidsData }) {
  return (
    <Container fluid>
      <Row className="g-4">
        {orchidsData.map((orchid) => (
          <Col md={3} className="d-flex" key={orchid.id}>
            <Card className="orchid-card">
              <Card.Img
                variant="top"
                src={orchid.image}
                className="orchid-img"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{orchid.orchidName}</Card.Title>
                <p>Id: {orchid.id}</p>
                <Card.Text>
                  {orchid.description}
                </Card.Text>
                <Card.Text>Category: {orchid.category}</Card.Text>
                <Badge bg="danger">
                  Special: {orchid.isSpecial ? "Yes" : "No"}
                </Badge>
                <Button variant="primary" className="mt-auto">
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
