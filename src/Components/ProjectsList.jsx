import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsAsync } from "../Features/projectSlice";
import toast, { Toaster } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

function ProjectsList({searchQuery}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch()
  const {projects, status} = useSelector((state)=>state.projects)

  const projectStatus = searchParams.get("projectStatus") || "" ;
  
  useEffect(()=>{
    dispatch(fetchProjectsAsync({projectStatus}))
  },[projectStatus])

  const filterByStatus = (value)=>{
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("projectStatus", value);
    } else {
      newParams.delete("projectStatus");
    }
    setSearchParams(newParams);
  };
  
  const findProjectByQuery = searchQuery === "" ? projects : projects?.filter(project=> project?.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <div className="py-1 ">
        <span className="fw-bold fs-2">Projects </span>{" "}
        <select  value={projectStatus}
            onChange={(e) => filterByStatus(e.target.value)} className="select mb-3">
          <option value="">Filter</option>
          <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
            <option value="Blocked">Blocked</option>
        </select>
        <Link 
        className="btn btn-primary float-end btn-sm mt-2 me-2"
         to="/addProject"
        >
          + New Project
        </Link>
      </div>

      <div className="row">
        {status === "Loading" && <p>Loading...</p> }
        { findProjectByQuery?.length>0 && findProjectByQuery?.map((project) => (
          <div className="col-md-4 py-3" key={project._id}>
            <Link className="text-decoration-0" to={`/projects/${project._id}`}>
            <div className="card card-background p-3 pt-5" style={{width:"330px" , height:"180px"}}>
              <h5>{project.name}</h5>
              <p>Description: {project.description}</p>
              <div className="card-img-overlay p-1">
                  <span
                    className={
                      project.status === "Blocked"
                        ? "text-bg-danger p-1 rounded"
                        : project.status === "Completed"
                        ? "text-bg-primary p-1 rounded"
                        : project.status === "To Do"
                        ? "text-bg-warning p-1 rounded"
                        : "text-bg-info p-1 rounded"
                    }
                  >
                    {project.status}
                  </span>
                </div>
            </div></Link>
          </div>
        ))}
       
      </div>
<Toaster/>
     
    </>
  );
}

export default ProjectsList;
