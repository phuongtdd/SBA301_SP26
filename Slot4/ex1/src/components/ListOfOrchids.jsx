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
import SearchBar from "./SearchBar";

export default function ListOfOrchids({ orchidsData }) {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("price-asc");
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
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
    <Container fluid>
      <div
        className="position-absolute end-0 p-3"
        style={{ zIndex: 1, top: "-40px" }}
      >
        <SearchBar searchValue={search} onSearchChange={setSearch} />
      </div>
      <div className="mb-4">
        <FilterSort
          categories={categories}
          onFilterChange={setFilter}
          onSortChange={setSort}
          filterValue={filter}
          sortValue={sort}
        />
      </div>
      <Row className="g-4">
        {displayedOrchids.map((orchid) => (
          <Col md={3} className="d-flex" key={orchid.id}>
            <Orchid orchid={orchid} onDetail={handleShow} />
          </Col>
        ))}
      </Row>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        title={selectedOrchid?.orchidName}
        body={
          <div>
            <img
              src={selectedOrchid?.image}
              alt={selectedOrchid?.orchidName}
              className="img-fluid mb-3"
            />
            <p>ID: {selectedOrchid?.id}</p>
            <p>Category: {selectedOrchid?.category}</p>
            <p>Price: {selectedOrchid?.price}</p>
            <p>Description: {selectedOrchid?.description}</p>
          </div>
        }
        onConfirm={handleClose}
      />
    </Container>
  );
}
