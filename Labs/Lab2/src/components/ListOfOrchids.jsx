import React, { useMemo } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import Orchid from "./Orchid";
import FilterSort from "./FilterSort";
import { useNavigate } from "react-router-dom";
export default function ListOfOrchids({ orchidsData, searchValue = "" }) {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("price-asc");
  const search = searchValue;

  const navigate = useNavigate();

  const handleShow = (orchid) => {
    navigate(`/home/detail/${orchid.id}`);
  };

  const categories = useMemo(
    () => Array.from(new Set(orchidsData.map((orchid) => orchid.category))),
    [orchidsData]
  );

  const displayedOrchids = useMemo(() => {
    if (!orchidsData) return [];
    let data = [...orchidsData];
    if (filter) {
      data = data.filter((orchid) => orchid.category === filter);
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

  return (
    <Container fluid className="px-2 px-sm-3 px-lg-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} sm={12} md={9} lg={9} className="mb-3 mb-md-0">
          <FilterSort
            categories={categories}
            onFilterChange={setFilter}
            onSortChange={setSort}
            filterValue={filter}
            sortValue={sort}
          />
        </Col>
      </Row>
      <Row className="g-2 g-sm-3 g-md-4">
        {displayedOrchids.map((orchid) => (
          <Col xs={6} sm={6} md={4} lg={3} className="d-flex" key={orchid.id}>
            <Orchid orchid={orchid} onDetail={handleShow} />
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
    </Container>
  );
}