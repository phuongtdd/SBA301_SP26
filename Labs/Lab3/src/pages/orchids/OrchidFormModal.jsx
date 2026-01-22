import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function OrchidFormModal({
    show,
    handleClose,
    onSubmit,
    formData,
    onInputChange,
    mode = "create", // "create" or "edit"
    submitting = false,
}) {
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    // Hàm validate form
    const validateForm = () => {
        const newErrors = {};

        // Validate tên hoa lan
        if (!formData.orchidName || formData.orchidName.trim() === "") {
            newErrors.orchidName = "Tên hoa lan không được để trống";
        } else if (formData.orchidName.trim().length < 2) {
            newErrors.orchidName = "Tên hoa lan phải có ít nhất 2 ký tự";
        }

        // Validate danh mục
        if (!formData.category || formData.category.trim() === "") {
            newErrors.category = "Danh mục không được để trống";
        }

        // Validate giá
        if (formData.price === "" || formData.price === null || formData.price === undefined) {
            newErrors.price = "Giá không được để trống";
        } else if (isNaN(Number(formData.price))) {
            newErrors.price = "Giá phải là một số hợp lệ";
        } else if (Number(formData.price) < 0) {
            newErrors.price = "Giá không được âm";
        }

        // Validate URL hình ảnh (nếu có nhập)
        if (formData.image && formData.image.trim() !== "") {
            const urlPattern = /^(https?:\/\/.*|images\/.*\.(jpg|jpeg|png|gif|webp))$/i;
            if (!urlPattern.test(formData.image.trim())) {
                newErrors.image = "URL hình ảnh không hợp lệ (phải là link http(s) hoặc đường dẫn images/...)";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setShowAlert(false);
            onSubmit(e);
        } else {
            setShowAlert(true);
        }
    };

    const handleInputChange = (e) => {
        const { name } = e.target;
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        onInputChange(e);
    };

    const handleCloseModal = () => {
        setErrors({});
        setShowAlert(false);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "create" ? "Thêm Hoa Lan Mới" : "Chỉnh Sửa Hoa Lan"}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    {showAlert && Object.keys(errors).length > 0 && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            <Alert.Heading>Vui lòng kiểm tra lại các trường sau:</Alert.Heading>
                            <ul className="mb-0">
                                {Object.values(errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}
                    {mode === "create" && (
                        <Form.Group className="mb-3">
                            <Form.Label>Id (tự động)</Form.Label>
                            <Form.Control
                                type="text"
                                name="orchidId"
                                value={formData.orchidId}
                                readOnly
                                disabled
                                className="bg-light"
                            />
                            <Form.Text className="text-muted">
                                ID được tự động tạo
                            </Form.Text>
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Tên hoa lan *</Form.Label>
                        <Form.Control
                            type="text"
                            name="orchidName"
                            value={formData.orchidName}
                            onChange={handleInputChange}
                            placeholder="Nhập tên hoa lan"
                            isInvalid={!!errors.orchidName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.orchidName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Nhập mô tả"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Danh mục *</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Dendrobium, Oncidium..."
                            isInvalid={!!errors.category}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.category}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Giá (VNĐ) *</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Nhập giá"
                            min="0"
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL Hình ảnh</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: images/orchid1.jpg"
                            isInvalid={!!errors.image}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.image}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            name="isSpecial"
                            label="Đánh dấu là hoa đặc biệt"
                            checked={formData.isSpecial}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button variant="primary" type="submit" disabled={submitting}>
                        {submitting
                            ? "Đang lưu..."
                            : mode === "create"
                                ? "Thêm mới"
                                : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
