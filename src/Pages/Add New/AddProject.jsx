import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectAsync,
  updateProjectAsync,
} from "../../Features/projectSlice";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [status, setStatus] = useState("");
const navigate = useNavigate()
  const projectId = useParams();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  
  const projectExist =
    projectId &&
    projects?.length>0 &&
    projects?.find((project) => project._id == projectId.projectId);
  const existing = Boolean(projectExist);

  useEffect(() => {
    if (existing) {
      setProjectName(projectExist.name || "");
      setProjectDescription(projectExist.description || "");
      setStatus(projectExist.status || "");
    }
  }, [projectExist, existing]);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (existing) {
      const updateProject = {
        name: projectName,
        description: projectDescription,
        status:status
      };

      dispatch(updateProjectAsync({ id: projectId.projectId, updateProject }));
      toast.success("Project Updated Successfully!");
      navigate("/settings")
    } else {
      const newProject = { name: projectName, description: projectDescription, status:status };
      dispatch(addProjectAsync({ newProject }));
      toast.success("Project Created Successfully!");
      navigate("/dashboard")
    }
  };

  return (
    <div className="login-overlay">
      <div className="popup">
        <div className="content card-background">
          <div className=" p-4 ">
            <h4>Create New Project</h4>
            <hr />

            <form onSubmit={handleAddProject}>
              <label htmlFor="projectName">Project Name</label>
              <br />
              <input
                className=" form-input"
                type="text"
                placeholder="Enter Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <label htmlFor="description">Project Description</label>
              <br />
              <textarea
                className=" form-input"
                rows="5"
                cols="50"
                placeholder="Enter Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              ></textarea>

<div className="input-group margin-1" style={{width:"95%"}}>
                <label htmlFor="status" className="input-group-text">
                   Status
                </label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Dropdown">Dropdown</option>
                  <option value="To Do">To Do</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                  <option value="In Progress">In Progress</option>
                  
                </select>
              </div>

              <button className="btn btn-primary mx-1 float-end" type="submit">
                {existing ? "Update" : "Create"}
              </button>
            </form>
            <Link
              className="btn btn-secondary mx-1 float-end"
              to={existing ? "/settings" : "/dashboard"}
            >
              Cancel
            </Link>
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default AddProject;
