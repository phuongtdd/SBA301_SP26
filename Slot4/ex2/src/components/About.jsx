import React from 'react';
import { Card, Button, Col, Container, Row } from 'react-bootstrap'; 

const AboutUs = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Img variant="top" src="/images/work.jpg" alt="About Us" />
            <Card.Body className="p-4">
              <Card.Title as="h1" className="display-4 fw-bold text-primary mb-3">
                About Us
              </Card.Title>
              
              <Card.Text className="lead text-muted">
                Chào mừng bạn đến với ứng dụng của chúng tôi. Chúng tôi cam kết mang
                lại những trải nghiệm tốt nhất thông qua công nghệ hiện đại.
              </Card.Text>
              
              <Card.Text>
                Với hơn 5 năm kinh nghiệm trong lĩnh vực phát triển phần mềm, đội ngũ
                của chúng tôi luôn nỗ lực không ngừng để tạo ra các sản phẩm có giá
                trị cao cho cộng đồng.
              </Card.Text>
              
              <div className="mt-4">
                <Button variant="outline-primary" size="lg">
                  Tìm hiểu thêm
                </Button>
              </div>
            </Card.Body>
          </Card>
          {/* Kết thúc Card */}
          
          <p className="text-center mt-3 text-muted small">
            This is the About page of our application.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;