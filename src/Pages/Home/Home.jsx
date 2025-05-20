import React, { useEffect, useState } from "react";
import ProjectsList from "../../Components/ProjectsList.jsx";
import TasksList from "../../Components/TasksList.jsx";
import Sidenav from "../../Components/Sidenav.jsx";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
          style={{ width: "250px" }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <Sidenav />
          </div>
        </div>
        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Sidenav />
        </div>
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
          <i className="bi bi-list"></i>
          </button>
          <section className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-describedby="inputGroup"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="input-group-text" id="inputGroup">
              <i className="bi bi-search"></i>
            </span>
          </section>
          <section>
            <ProjectsList searchQuery={searchQuery} />
          </section>
          <section >
            <TasksList searchQuery={searchQuery} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
