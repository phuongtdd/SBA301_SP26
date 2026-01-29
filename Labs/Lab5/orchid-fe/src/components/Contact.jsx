import React, { useState } from "react";
import {
  Col,
  Button,
  Form,
  InputGroup,
  Row,
  Card,
  Container,
} from "react-bootstrap";
import ConfirmModal from "../pages/orchids/ConfirmModal";

export default function Contact() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setValidated(true);

    const data = new FormData(form);
    const formValues = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
    };

    setFormData(formValues);
    setShow(true);
  };

  return (
    // Thêm div bao ngoài để tạo màu nền cho toàn trang (hoặc vùng chứa)
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                {/* Tiêu đề Form */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary text-uppercase">
                    Liên Hệ
                  </h2>
                  <p className="text-muted">
                    Vui lòng điền thông tin bên dưới, chúng tôi sẽ liên hệ lại
                    sớm nhất!
                  </p>
                </div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-4">
                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="validationCustom01"
                      className="mb-3 mb-md-0"
                    >
                      <Form.Label className="fw-semibold">
                        Họ (First name)
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        placeholder="Nhập họ..."
                        className="py-2" // Tăng chiều cao ô input
                      />
                      <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập họ.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label className="fw-semibold">
                        Tên (Last name)
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        placeholder="Nhập tên..."
                        className="py-2"
                      />
                      <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập tên.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-4">
                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="validationCustomerEmail"
                      className="mb-3 mb-md-0"
                    >
                      <Form.Label className="fw-semibold">Email</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text
                          id="inputGroupPrepend"
                          className="bg-light"
                        >
                          <i className="bi bi-envelope-at">@</i>{" "}
                          {/* Nếu có icon thì thay vào đây */}
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          aria-describedby="inputGroupPrepend"
                          required
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">
                          Email không hợp lệ.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="validationCustomerPhone"
                    >
                      <Form.Label className="fw-semibold">
                        Số điện thoại
                      </Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text
                          id="inputGroupPrepend"
                          className="bg-light"
                        >
                          +84
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="0912..."
                          aria-describedby="inputGroupPrepend"
                          required
                          pattern="[0-9]{10}"
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">
                          SĐT phải có 10 chữ số.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Check
                      required
                      label={
                        <span className="text-muted">
                          Tôi đồng ý với{" "}
                          <a href="#terms" className="text-decoration-none">
                            điều khoản sử dụng
                          </a>
                        </span>
                      }
                      feedback="Bạn cần đồng ý trước khi gửi."
                      feedbackType="invalid"
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="shadow-sm fw-bold"
                    >
                      Gửi thông tin
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <ConfirmModal
        show={show}
        handleClose={handleClose}
        title="Xác nhận thông tin"
        body={
          formData ? (
            <div className="fs-5">
              <Row className="mb-2">
                <Col xs={4} className="fw-bold text-muted">
                  Họ tên:
                </Col>
                <Col xs={8}>
                  {formData.firstName} {formData.lastName}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4} className="fw-bold text-muted">
                  Email:
                </Col>
                <Col xs={8}>{formData.email}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4} className="fw-bold text-muted">
                  SĐT:
                </Col>
                <Col xs={8}>{formData.phone}</Col>
              </Row>
            </div>
          ) : (
            <p>Không có dữ liệu</p>
          )
        }
        onConfirm={() => {
          alert("Gửi thành công!");
          handleClose();
        }}
      />
    </div>
  );
}
