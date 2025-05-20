import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchTeamsAsync } from "../../Features/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidenav from "../../Components/Sidenav";
import AddTeam from "../Add New/AddTeam";

function TeamDetail() {
  const teamId = useParams();
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeamsAsync());
  }, []);

  const teamData = teams?.find((team) => team._id == teamId.teamId);

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
          <section className="pb-3 px-2">
            {" "}
            <Link className="remove-underline  mx-4" to="/teams">
              <i className="bi bi-arrow-left"></i> Back to Teams
            </Link>
          </section>
          <section className=" px-2">
            <div className="p-4">
              <h3>{teamData?.name}</h3>
              <h4 className="fw-normal fs-5 text-light-gray">MEMBERS</h4>
            
              {teamData?.members.map((member) => (
                <div className="pb-1   " key={member._id}>
                  <p
                    style={{
                      display: "inline-block",
                      width: "30px",
                      height: "30px",
                      border: "1px solid white",
                      borderRadius: "50%",
                      textAlign: "center",
                      lineHeight: "30px",
                      backgroundColor: "antiquewhite",
                      color: "brown",
                      zIndex: 1,

                      paddingBottom: "8px",
                    }}
                  >
                    {member.charAt(0)}
                  </p>
                  {member} 
                  
                </div>
              ))}</div>
           
          </section>
             <section className="pb-3 px-2">
            <div className="py-1 ">
            
              <button
                type="button"
        className="btn btn-primary ms-auto me-2"
        data-bs-toggle="modal"
        data-bs-target="#addNewTeam"
        data-bs-whatever="@mdo"
              >
                + Members
              </button>
            </div>
            <div className="py-1">
               <div
        className="modal fade"
        id="addNewTeam"
        tabIndex="-1"
        aria-labelledby="teamModelLabel"
        aria-hidden="true"
      >
        <AddTeam />
      </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
