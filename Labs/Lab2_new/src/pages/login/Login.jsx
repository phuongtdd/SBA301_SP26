import { Col, Button, Form, Row, Container, Alert } from "react-bootstrap";
import { PersonFill, LockFill } from "react-bootstrap-icons";
import "./Login.css";
import { useLogin } from "../../hooks/loginHooks";

export default function Login() {
  const { error, validated, formRef, handleLogin, handleCancel } = useLogin();

  return (
    <Container fluid className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Đăng nhập hệ thống</h1>
          <p className="login-subtitle">
            Vui lòng nhập thông tin tài khoản để tiếp tục
          </p>
        </div>

        <Form
          ref={formRef}
          noValidate
          validated={validated}
          onSubmit={handleLogin}
        >
          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="mb-4">
            <Form.Group
              as={Col}
              md="12"
              controlId="validationCustom01"
              className="mb-4"
            >
              <Form.Label className="fw-semibold">
                <PersonFill className="me-2" />
                Tên đăng nhập
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập của bạn..."
                className="py-3"
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên đăng nhập.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label className="fw-semibold">
                <LockFill className="me-2" />
                Mật khẩu
              </Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Nhập mật khẩu của bạn..."
                className="py-3"
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mật khẩu.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <div className="d-grid gap-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="shadow-sm fw-bold py-3"
            >
              Đăng nhập
            </Button>
            <Button
              type="button"
              variant="warning"
              size="lg"
              className="shadow-sm fw-bold py-3"
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
          </div>
        </Form>

        <div className="login-footer">
          <p>
            © 2025 Hệ thống Quản lý. <a href="/help">Trợ giúp?</a>
          </p>
        </div>
      </div>
    </Container>
  );
}
