import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export default function Orchid({ orchidsData }) {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

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
                <Card.Text>Category: {orchid.category}</Card.Text>
                <Badge
                  bg="danger"
                  className="position-absolute top-0 end-0 m-2"
                  style={{ zIndex: 2 }}
                >
                  Special: {orchid.isSpecial ? "Yes" : "No"}
                </Badge>

                <div className="d-flex justify-content-center mt-auto gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleShow(orchid)}
                  >
                    Detail
                  </Button>
                  <Button variant="primary" size="sm">
                    Buy Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOrchid?.orchidName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrchid ? (
            <div>
              <img
                src={selectedOrchid.image}
                alt={selectedOrchid.orchidName}
                style={{ width: "100%" }}
              />

              <p>{selectedOrchid.description}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
