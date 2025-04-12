import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsAsync } from "../../Features/teamSlice";

function Teams() {
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.teams);
 
  useEffect(() => {
    dispatch(fetchTeamsAsync());
  }, []);
 

  return (
    <>
      <section className="pb-3 px-2">
        <div className="py-1 ">
          <span className="fw-bold fs-2 heading-color">Teams </span>
          <Link
            className="btn btn-primary float-end btn-sm mt-2 me-2"
           to="/addTeam"
          >
            + New Team
          </Link>
        </div>
      </section>
      <section className="pb-3 px-2">
        <div className="row">
          {status === "Loading" && <p>Loading...</p>}
          {teams?.length>0 && teams?.map((team) => (
            <div className="col-md-4 py-2" key={team._id}>
              <Link className="remove-underline" to={`/teamDetail/${team._id}`}>
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
                       {team?.members[0]?.charAt(0) ? team?.members[0]?.charAt(0) : "P"}
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
                        +{team?.members?.length>0 ?team?.members?.length : 0 }
                      </span>{" "}
                      
                    </p>                   
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {error && <p>{error}</p>}
        </div>
      </section>
    </>
  );
}

export default Teams;
