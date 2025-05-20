import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsAsync } from "../Features/projectSlice";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddProject from "../Pages/Add New/AddProject";



function ProjectsList({ searchQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { projects, status } = useSelector((state) => state.projects);

  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded); // Check the actual field names
        setUserId(decoded._id || decoded.id); // Try both _id and id
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        toast.error("Invalid session. Please log in again.");
        navigate("/login"); // Redirect to login page if necessary
      }
    }
  }, [navigate]);

  const projectStatus = searchParams.get("projectStatus") || "";

  useEffect(() => {
    dispatch(fetchProjectsAsync({ projectStatus }));
  }, [projectStatus]);

  const filterByStatus = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("projectStatus", value);
    } else {
      newParams.delete("projectStatus");
    }
    setSearchParams(newParams);
  };

  const findProjectByQuery =
    searchQuery === ""
      ? projects
      : projects?.filter((project) =>
          project?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );



  return (
    <div className="row py-3 ">
    
      <div className="col-md-1">
        <h3>Projects</h3>
      </div>
      <div className="col-md-8">
        {" "}
        <select
          value={projectStatus}
          onChange={(e) => filterByStatus(e.target.value)}
          className="form-select mx-3"
          style={{ width: "150px" }}
        >
          <option value="">Filter</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="To Do">To Do</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      <div className="col-md-3">
        <button
          type="button"
          className="btn btn-primary float-end ms-auto me-2"
          data-bs-toggle="modal"
          data-bs-target="#addNewProject"
          data-bs-whatever="@mdo"
        >
          + New Project
        </button>
      </div>

      <div className="row">
        {status === "Loading" && (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
            Loading...
          </p>
        )}

        {findProjectByQuery?.length > 0 &&
          findProjectByQuery?.map((project) => (
            <div className="col-md-4 py-3" key={project._id}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/projects/${project._id}`}
              >
                <div className="card pt-5 p-3 bg-light border-0">
                  <h5>{project.name}</h5>
                  <p>Description: {project.description}</p>
                  <div className="card-img-overlay p-1">
                    <span
                      className={`d-inline-block px-2 rounded ${
                        project.status === "Blocked"
                          ? "text-bg-danger"
                          : project.status === "Completed"
                          ? "text-bg-primary"
                          : project.status === "To Do"
                          ? "text-bg-warning"
                          : "text-bg-info"
                      }`}
                      style={{ width: "fit-content", minWidth: "auto" }}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        <div
          className="modal fade"
          id="addNewProject"
          tabIndex="-1"
          aria-labelledby="projectModelLabel"
          aria-hidden="true"
        >
          <AddProject />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default ProjectsList;
