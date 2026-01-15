import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header searchValue={search} onSearchChange={setSearch} />
      <main className="py-4">
        <Outlet context={{ search }} />
      </main>
      <Footer
        avatar="/images/work.jpg"
        name="phuongtdd"
        email="phuongtddde180212@fpt.edu.vn"
      />
    </>
  );
}
