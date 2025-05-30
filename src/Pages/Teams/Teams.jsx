import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsAsync } from "../../Features/teamSlice";
import Sidenav from "../../Components/Sidenav";
import AddTeam from "../Add New/AddTeam";

function Teams() {
  const dispatch = useDispatch();
  
  const { teams, status, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeamsAsync());
  }, []);

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
         <div className="d-flex py-3">
            <h2>Teams</h2>
            <button
              type="button"
              className="btn btn-primary ms-auto"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              + New Team
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              // aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Create New Team 
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <AddTeam />
                </div>
              </div>
            </div>
          </div>
          <section className="pb-3 px-2">
            <div className="row">
                {status === "Loading" &&  <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
          Loading...
        </p>}
       {error !== null && (
        <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
          {error}
        </p>)}
              {teams?.length > 0 &&
                teams?.map((team) => (
                  <div className="col-md-4 py-2" key={team._id}>
                    <Link
                     style={{textDecoration:"none"}}
                      to={`/teamDetail/${team._id}`}
                    >
                      <div className="card card-background p-3 ">
                        <h5>{team.name}</h5>

                        <div className="row">
                          <p>
                            <span
                              style={{
                                display: "inline-block",
                                width: "38px",
                                height: "38px",
                                borderRadius: "50%",
                                textAlign: "center",
                                lineHeight: "40px",
                                zIndex: 1,
                                marginRight: "-10px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "30px", height: "30" }}
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-person"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                              </svg>
                            </span>{" "}
                            <span
                              style={{
                                display: "inline-block",
                                width: "38px",
                                height: "38px",
                                border: "1px solid white",
                                borderRadius: "50%",
                                textAlign: "center",
                                lineHeight: "38px",
                                backgroundColor: "#fd7e14",
                                color: "brown",
                                zIndex: 1,
                                marginRight: "-10px",
                                paddingBottom: "8px",
                              }}
                            > 
                              {team?.members[0]?.name.charAt(0)
                                ? team?.members[0]?.name.charAt(0)
                                : "P"}
                            </span>{" "}
                            <span
                              style={{
                                display: "inline-block",
                                width: "38px",
                                height: "38px",
                                border: "1px solid white",
                                borderRadius: "50%",
                                textAlign: "center",
                                backgroundColor: "#198754",
                                color: "brown",
                                lineHeight: "40px",
                                zIndex: 1,
                                marginRight: "-10px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-person"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                              </svg>
                            </span>
                            <span
                              style={{
                                display: "inline-block",
                                width: "38px",
                                height: "38px",
                                border: "1px solid white",
                                borderRadius: "50%",
                                textAlign: "center",
                                lineHeight: "38px",
                                backgroundColor: "antiquewhite",
                                color: "brown",
                                zIndex: 1,
                                marginRight: "-10px",
                                paddingBottom: "8px",
                              }}
                            >
                              +
                              {team?.members?.length > 0
                                ? team?.members?.length
                                : 0}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
             
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Teams;
