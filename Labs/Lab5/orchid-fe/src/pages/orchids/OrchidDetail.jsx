import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import { getOrchidById } from "../../services/orchidApi";

export default function OrchidDetail() {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        setLoading(true);
        const data = await getOrchidById(id);
        console.log("API response for orchid detail:", data);
        setOrchid(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orchid:", err);
        setError("Không thể tải thông tin hoa lan");
      } finally {
        setLoading(false);
      }
    };

    fetchOrchid();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Đang tải...</span>
            </Spinner>
            <p className="mt-3">Đang tải thông tin hoa lan...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error || !orchid) {
    return (
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <div style={{ padding: "2rem" }}>
              <h3 className="text-danger">Hoa lan không được tìm thấy</h3>
              <p className="text-secondary mb-4">
                {error || `ID sản phẩm: ${id} không tồn tại`}
              </p>
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
          <Card className="position-relative">
            {/* Badges */}
            <div className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-2" style={{ zIndex: 10 }}>
              {orchid.isNatural && (
                <Badge
                  bg="danger"
                  className="px-3 py-2 rounded-pill shadow"
                  style={{ fontSize: "0.85rem" }}
                >
                  ⭐ Đặc biệt
                </Badge>
              )}
              {orchid.isAttractive && (
                <Badge
                  bg="warning"
                  text="dark"
                  className="px-3 py-2 rounded-pill shadow"
                  style={{ fontSize: "0.85rem" }}
                >
                  🌈 Sặc sỡ
                </Badge>
              )}
            </div>

            <Card.Img
              variant="top"
              src={orchid.orchidURL}
              alt={orchid.orchidName}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="display-5 text-primary mb-4">
                {orchid.orchidName}
              </Card.Title>

              <Card.Text>
                <strong>ID:</strong> {orchid.orchidID} <br />
                <strong>Danh mục:</strong> {orchid.orchidCategory?.name || 'N/A'} <br />
                <strong>Giá:</strong>{" "}
                <span className="text-danger fw-bold fs-4">
                  {orchid.price?.toLocaleString("vi-VN")} VNĐ
                </span>
              </Card.Text>

              <Card.Text>
                <strong>Mô tả:</strong> {orchid.orchidDescription || "Chưa có mô tả"}
              </Card.Text>

              <div className="mt-4">
                <Link to="/home">
                  <Button variant="dark">Quay lại trang chủ</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
