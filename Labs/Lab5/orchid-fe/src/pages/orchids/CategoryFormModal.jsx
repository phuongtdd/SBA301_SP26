import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function CategoryFormModal({
    show,
    handleClose,
    onSubmit,
    submitting = false,
}) {
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!categoryName || categoryName.trim() === "") {
            setError("Tên danh mục không được để trống");
            return;
        }

        if (categoryName.trim().length < 2) {
            setError("Tên danh mục phải có ít nhất 2 ký tự");
            return;
        }

        setError("");
        onSubmit({ name: categoryName.trim() });
    };

    const handleCloseModal = () => {
        setCategoryName("");
        setError("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Danh Mục Mới</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    {error && (
                        <Alert variant="danger" onClose={() => setError("")} dismissible>
                            {error}
                        </Alert>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>Tên danh mục *</Form.Label>
                        <Form.Control
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Ví dụ: Dendrobium, Oncidium..."
                            isInvalid={!!error}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button variant="success" type="submit" disabled={submitting}>
                        {submitting ? "Đang lưu..." : "Tạo danh mục"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
