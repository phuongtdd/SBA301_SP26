import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function OrchidDetail({ orchidsData }) {
  const { id } = useParams();

  const orchid = orchidsData.find((o) => String(o.id) === id);


  if (!orchid) {
    return <div className="text-center mt-5">Orchid not found</div>;
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>

            <Card.Img
              variant="top"
              src={`/${orchid.image}`} 
              alt={orchid.orchidName}
            />
            <Card.Body>
              <Card.Title className="display-4 text-primary">
                {orchid.orchidName}
              </Card.Title>
              <Card.Text>
                <strong>ID:</strong> {orchid.id} <br />
                <strong>Category:</strong> {orchid.category} <br />
                <strong>Price:</strong>{" "}
                <span className="text-danger fw-bold">{orchid.price}</span>
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {orchid.description}
              </Card.Text>

              <div className="mt-4">
                <Link to="/">
                  <Button variant="dark">Back to Home</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
