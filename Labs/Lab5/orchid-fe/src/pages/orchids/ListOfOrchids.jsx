import React, { useMemo, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Orchid from "./Orchid";
import FilterSort from "./FilterSort";
import ConfirmModal from "./ConfirmModal";
import OrchidFormModal from "./OrchidFormModal";
import CategoryFormModal from "./CategoryFormModal";
import { useNavigate } from "react-router-dom";
import { getAllOrchids, updateOrchid, deleteOrchid, createOrchid } from "../../services/orchidApi";
import { getAllCategories, createCategory } from "../../services/categoryApi";

export default function ListOfOrchids({ searchValue = "" }) {
  const [orchidsData, setOrchidsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("price-asc");
  const search = searchValue;

  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categorySubmitting, setCategorySubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [formData, setFormData] = useState({
    orchidName: "",
    orchidDescription: "",
    orchidCategory: "",
    isAttractive: false,
    isNatural: false,
    price: "",
    orchidURL: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orchidToDelete, setOrchidToDelete] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

  useEffect(() => {
    fetchOrchids();
    fetchCategories();
  }, []);

  const fetchOrchids = async () => {
    try {
      setLoading(true);
      const data = await getAllOrchids();
      setOrchidsData(data);
      setError(null);
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại!");
      console.error("Error fetching orchids:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      console.log("Categories API response:", data);
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const navigate = useNavigate();

  const handleShow = (orchid) => {
    navigate(`/home/detail/${orchid.orchidID}`);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedOrchid(null);
    setFormData({
      orchidName: "",
      orchidDescription: "",
      orchidCategory: "",
      isAttractive: false,
      isNatural: false,
      price: "",
      orchidURL: "",
    });
    setShowModal(true);
  };

  const handleEdit = (orchid) => {
    setModalMode("edit");
    setSelectedOrchid(orchid);
    setFormData({
      orchidId: orchid.orchidId || "",
      orchidName: orchid.orchidName || "",
      orchidDescription: orchid.orchidDescription || "",
      orchidCategory: orchid.orchidCategory?.categoryID || orchid.orchidCategory || "",
      isAttractive: orchid.isAttractive || false,
      price: orchid.price || "",
      orchidURL: orchid.orchidURL || "",
      isNatural: orchid.isNatural || false,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrchid(null);
    setFormData({
      orchidId: "",
      orchidName: "",
      orchidDescription: "",
      orchidCategory: "",
      isAttractive: false,
      isNatural: false,
      price: "",
      orchidURL: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("formData.orchidCategory value:", formData.orchidCategory, typeof formData.orchidCategory);

      const categoryId = parseInt(formData.orchidCategory);
      console.log("Parsed categoryId:", categoryId);

      const orchidData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        orchidCategory: categoryId ? { categoryID: categoryId } : null,
      };

      console.log("Final orchidData:", orchidData);

      if (modalMode === "create") {
        const newOrchid = {
          ...orchidData,
        };
        delete newOrchid.orchidId;
        await createOrchid(newOrchid);
        setToast({ show: true, message: "Thêm hoa lan thành công!", variant: "success" });
      } else {
        await updateOrchid(selectedOrchid.orchidID, orchidData);
        setToast({ show: true, message: "Cập nhật hoa lan thành công!", variant: "success" });
      }

      handleCloseModal();
      fetchOrchids();
    } catch (err) {
      console.error("Error saving orchid:", err);
      setToast({ show: true, message: "Có lỗi xảy ra. Vui lòng thử lại!", variant: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  // Category handlers
  const handleOpenCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  const handleCreateCategory = async (categoryData) => {
    setCategorySubmitting(true);
    try {
      await createCategory(categoryData);
      setToast({ show: true, message: "Tạo danh mục thành công!", variant: "success" });
      handleCloseCategoryModal();
      fetchCategories();
    } catch (err) {
      console.error("Error creating category:", err);
      setToast({ show: true, message: "Có lỗi xảy ra khi tạo danh mục!", variant: "danger" });
    } finally {
      setCategorySubmitting(false);
    }
  };

  const handleDeleteClick = (orchid) => {
    setOrchidToDelete(orchid);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!orchidToDelete) return;

    try {
      await deleteOrchid(orchidToDelete.orchidID);
      setToast({ show: true, message: "Xóa hoa lan thành công!", variant: "success" });
      setShowDeleteModal(false);
      setOrchidToDelete(null);
      fetchOrchids();
    } catch (err) {
      console.error("Error deleting orchid:", err);
      setToast({ show: true, message: "Có lỗi xảy ra khi xóa. Vui lòng thử lại!", variant: "danger" });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setOrchidToDelete(null);
  };

  // Get category names for filter
  const categoryNames = useMemo(
    () => categories.map((cat) => cat.name),
    [categories]
  );

  const displayedOrchids = useMemo(() => {
    if (!orchidsData) return [];
    let data = [...orchidsData];
    if (filter) {
      data = data.filter((orchid) => {
        const catName = orchid.orchidCategory?.name || orchid.orchidCategory;
        return catName === filter;
      });
    }

    if (search) {
      const q = search.trim().toLowerCase();
      data = data.filter((orchid) =>
        (orchid.orchidName || "").toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name-asc":
        data.sort((a, b) => a.orchidName.localeCompare(b.orchidName));
        break;
      case "name-desc":
        data.sort((a, b) => b.orchidName.localeCompare(a.orchidName));
        break;
      default:
        break;
    }
    return data;
  }, [orchidsData, filter, sort, search]);

  // Loading state
  if (loading) {
    return (
      <Container fluid className="px-2 px-sm-3 px-lg-4 text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-3">Đang tải dữ liệu...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container fluid className="px-2 px-sm-3 px-lg-4 text-center py-5">
        <div className="text-danger">
          <h4>Lỗi!</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchOrchids}>
            Thử lại
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="px-2 px-sm-3 px-lg-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} sm={12} md={7} lg={7} className="mb-3 mb-md-0">
          <FilterSort
            categories={categoryNames}
            onFilterChange={setFilter}
            onSortChange={setSort}
            filterValue={filter}
            sortValue={sort}
          />
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} className="text-md-end d-flex gap-2 justify-content-md-end">
          <Button variant="outline-primary" onClick={handleOpenCategoryModal}>
            + Tạo danh mục
          </Button>
          <Button variant="success" onClick={handleOpenCreateModal}>
            + Thêm hoa mới
          </Button>
        </Col>
      </Row>
      <Row className="g-2 g-sm-3 g-md-4">
        {displayedOrchids.map((orchid) => (
          <Col xs={6} sm={6} md={4} lg={3} className="d-flex" key={orchid.orchidID}>
            <Orchid
              orchid={orchid}
              onDetail={handleShow}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </Col>
        ))}
      </Row>
      {displayedOrchids.length === 0 ? (
        <Row className="mt-5">
          <Col xs={12} className="text-center">
            <div style={{ padding: "2rem" }}>
              <h4 className="text-muted">Không tìm thấy hoa lan</h4>
              <p className="text-secondary">Vui lòng thử tìm kiếm hoặc lọc khác</p>
            </div>
          </Col>
        </Row>
      ) : null}

      <OrchidFormModal
        show={showModal}
        handleClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        categories={categories}
        mode={modalMode}
        submitting={submitting}
      />

      <CategoryFormModal
        show={showCategoryModal}
        handleClose={handleCloseCategoryModal}
        onSubmit={handleCreateCategory}
        submitting={categorySubmitting}
      />

      <ConfirmModal
        show={showDeleteModal}
        title="Xác nhận xóa"
        handleClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        body={
          <>
            <p>Bạn có chắc chắn muốn xóa hoa lan <strong>"{orchidToDelete?.orchidName}"</strong>?</p>
            <p className="text-danger mb-0">Hành động này không thể hoàn tác!</p>
          </>
        }
      />

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toast.variant === "success" ? "✓ Thành công" : "✕ Lỗi"}
            </strong>
          </Toast.Header>
          <Toast.Body className={toast.variant === "success" ? "text-white" : "text-white"}>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}