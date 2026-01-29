import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Orchid extends Component {
  renderCard() {
    const { orchid, onDetail, onEdit, onDelete } = this.props;
    return (
      <Card className="orchid-card">
        <Card.Img variant="top" src={orchid.orchidURL} className="orchid-img" />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{orchid.orchidName}</Card.Title>
          <p>Id: {orchid.orchidID}</p>
          <Card.Text>Category: {orchid.orchidCategory?.name || 'N/A'}</Card.Text>

          {/* Badges container */}
          <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1">
            {orchid.isNatural && (
              <span className="px-2 py-1 bg-danger text-white rounded-pill shadow-sm" style={{ fontSize: "0.75rem" }}>
                ⭐ Đặc biệt
              </span>
            )}
            {orchid.isAttractive && (
              <span className="px-2 py-1 bg-warning text-dark rounded-pill shadow-sm" style={{ fontSize: "0.75rem" }}>
                🌈 Sặc sỡ
              </span>
            )}
          </div>

          <p>Price: {orchid.price?.toLocaleString("vi-VN")} VNĐ</p>
          <div className="d-flex flex-column gap-2 mt-auto">
            <div className="d-flex justify-content-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => (onDetail ? onDetail(orchid) : null)}
              >
                Detail
              </Button>
              <Button variant="primary" size="sm">
                Buy Now
              </Button>
            </div>
            <div className="d-flex justify-content-center gap-2">
              <Button
                variant="warning"
                size="sm"
                onClick={() => (onEdit ? onEdit(orchid) : null)}
              >
                Sửa
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => (onDelete ? onDelete(orchid) : null)}
              >
                Xóa
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  renderDetail(orchid) {
    if (!orchid) {
      return (
        <div style={{ padding: "2rem" }}>
          <h3>Không tìm thấy hoa lan</h3>
          <Button as={Link} to="/orchid" variant="primary">
            Quay lại
          </Button>
        </div>
      );
    }

    return (
      <div className="orchid-page" style={{ padding: "2rem" }}>
        <Card
          className="orchid-card"
          style={{ maxWidth: 900, margin: "0 auto" }}
        >
          <Card.Img
            variant="top"
            src={orchid.orchidURL}
            alt={orchid.orchidName}
          />
          <Card.Body>
            <Card.Title>{orchid.orchidName}</Card.Title>
            <Card.Text>{orchid.orchidDescription}</Card.Text>
            <div className="orchid-info">
              <p>
                <strong>Danh mục:</strong> {orchid.orchidCategory?.name || 'N/A'}
              </p>
              <p>
                <strong>Giá:</strong> {orchid.price}
              </p>
            </div>
            {orchid.isNatural && (
              <span className="special-badge">Đặc biệt</span>
            )}
            {orchid.isAttractive && (
              <span className="special-badge">Sặc sỡ</span>
            )}
            <div style={{ marginTop: "1rem" }}>
              <Button as={Link} to="/orchid" variant="outline-primary">
                Quay lại bộ sưu tập
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  render() {
    const { orchid } = this.props;
    if (orchid) return this.renderCard();

    // No orchid prop passed — show not found message
    return (
      <div style={{ padding: "2rem" }}>
        <h3>Không tìm thấy hoa lan</h3>
        <Button as={Link} to="/orchid" variant="primary">
          Quay lại
        </Button>
      </div>
    );
  }
}

export default Orchid;
