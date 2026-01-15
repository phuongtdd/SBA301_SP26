import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function OrchidDetail({ orchidsData }) {
  const { id } = useParams();

  if (!orchidsData || orchidsData.length === 0) {
    return (
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <div style={{ padding: "2rem" }}>
              <h3 className="text-danger">Không có dữ liệu</h3>
              <p className="text-secondary mb-4">Dữ liệu sản phẩm không khả dụng</p>
              <Link to="/home">
                <Button variant="dark">Quay lại trang chủ</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  const orchid = orchidsData.find((o) => String(o.id) === id);

  if (!orchid) {
    return (
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <div style={{ padding: "2rem" }}>
              <h3 className="text-danger">Hoa lan không được tìm thấy</h3>
              <p className="text-secondary mb-4">ID sản phẩm: {id} không tồn tại</p>
              <Link to="/home">
                <Button variant="dark">Quay lại trang chủ</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
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
                <Link to="/home">
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
