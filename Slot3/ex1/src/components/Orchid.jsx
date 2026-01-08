import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

export default function Orchid() {
  return (
    <Container fluid>
      <Row className="g-4">
      <Col md={3} className="d-flex">
        <Card className="orchid-card">
          <Card.Img
            variant="top"
            src="images/orchid1.jpg"
            className="orchid-img"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Ceasar 4N</Card.Title>
            <Card.Text>
              <p>Id: 1</p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              porta lobortis ex. Morbi cursus consectetur diam, non lobortis
              massa gravida eu.
            </Card.Text>
            <Card.Text>Category: Dendrobium</Card.Text>
            <Badge bg="danger">Special: Yes </Badge>
            <Button variant="primary" className="mt-auto">
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} className="d-flex">
        <Card className="orchid-card">
          <Card.Img
            variant="top"
            src="images/orchid2.jpg"
            className="orchid-img"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Phalaenopsis Alba</Card.Title>
            <Card.Text>
              <p>Id: 2</p>
              Bông trắng thanh lịch, thích hợp trưng bày trong phòng khách hoặc
              làm quà tặng. Cần ánh sáng gián tiếp và tưới nước vừa phải.
            </Card.Text>
            <Card.Text>Category: Phalaenopsis</Card.Text>
            <Badge bg="danger">Special: No </Badge>
            <Button variant="primary" className="mt-auto">
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} className="d-flex">
        <Card className="orchid-card">
          <Card.Img
            variant="top"
            src="images/orchid3.jpg"
            className="orchid-img"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Vanda Blue</Card.Title>
            <Card.Text>
              <p>Id: 3</p>
              Màu xanh tím nổi bật, ưa nắng và độ ẩm cao. Rất thích hợp trồng
              treo để phát triển rễ ngoài trời.
            </Card.Text>
            <Card.Text>Category: Vanda</Card.Text>
            <Badge bg="danger">Special: Yes </Badge>
            <Button variant="primary" className="mt-auto">
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} className="d-flex">
        <Card className="orchid-card">
          <Card.Img
            variant="top"
            src="images/orchid4.jpg"
            className="orchid-img"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Cattleya Sunrise</Card.Title>
            <Card.Text>
              <p>Id: 4</p>
              Hương thơm nhẹ, cánh dày, nở to. Thích hợp cho người mới chơi vì
              dễ chăm sóc.
            </Card.Text>
            <Card.Text>Category: Cattleya</Card.Text>
            <Badge bg="danger">Special: No </Badge>
            <Button variant="primary" className="mt-auto">
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} className="d-flex">
        <Card className="orchid-card">
          <Card.Img
            variant="top"
            src="images/orchid5.jpg"
            className="orchid-img"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Dendrobium Snow</Card.Title>
            <Card.Text>
              <p>Id: 5</p>
              Hương thơm nhẹ, cánh dày, nở to. Thích hợp cho người mới chơi vì
              dễ chăm sóc.
            </Card.Text>
            <Card.Text>Category: Dendrobium</Card.Text>
            <Badge bg="danger">Special: No </Badge>
            <Button variant="primary" className="mt-auto">
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} className="d-flex">
        <Card className="orchid-card">
          <Card.Img
            variant="top"
            src="images/orchid6.jpg"
            className="orchid-img"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Miltonia Spot</Card.Title>
            <Card.Text>
              <p>Id: 6</p>
              Kiểu hoa nhỏ, họa tiết chấm độc đáo, phù hợp bố trí trong chậu nhỏ
              trên bàn làm việc.
            </Card.Text>
            <Card.Text>Category: Miltonia</Card.Text>
            <Badge bg="danger">Special: No </Badge>
            <Button variant="primary" className="mt-auto">
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
  );
}
