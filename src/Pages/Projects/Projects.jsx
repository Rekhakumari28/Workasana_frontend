import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProjectsAsync } from "../../Features/projectSlice";
import { fetchTasksAsync } from "../../Features/taskSlice";

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectId = useParams();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);

  const taskStatus = searchParams.get("taskStatus") || "";
  const prioritySort = searchParams.get("prioritySort") || "";
  const dateSort = searchParams.get("dateSort") || "";

  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, []);
  useEffect(() => {
    dispatch(fetchTasksAsync({taskStatus, prioritySort,dateSort }));
  }, [taskStatus, prioritySort,dateSort]);

  const taskFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const filterByStatus = (value)=>{
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("taskStatus", value);
    } else {
      newParams.delete("taskStatus");
    }
    setSearchParams(newParams);
  };
  

  const projectData = projects?.find(
    (project) => project._id == projectId.projectId
  );
  const tasksFromProject = projectData
    ? tasks.filter((task) => task.project.name === projectData?.name)
    : tasks;

  return (
    <>
      <section className="pb-3 px-2">
        <span className="fw-bold fs-2 heading-color">
          {projectData?.name || "All Projects"}
        </span>

        <p>
          {projectData?.description ||
            "Here is all tasks, owners, priority, due dates, status displaying"}{" "}
        </p>
      </section>
      <section className="pb-3 px-2 ">
        <div className="py-1 ">
          <span>
            Sort By: <button className="btn sortBy pb-2" onClick={()=>taskFilters("prioritySort", "Low-High")}>Proprity Low-High</button>
            <button className="btn sortBy pb-2" onClick={()=>taskFilters("prioritySort", "High-Low")}>Proprity High-Low</button>
            <button className="btn sortBy pb-2" onClick={()=>taskFilters("dateSort", "Newest-Oldest")}>Newest First</button>
            <button className="btn sortBy pb-2" onClick={()=>taskFilters("dateSort", "Oldest-Newest")}>Oldest First</button>
          </span>{" "}
         
          <span className="ms-5 ">
            <select
              value={taskStatus}
              onChange={(e) => filterByStatus(e.target.value)}
              className="select mb-3"
            >
              <option value="">Filter</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="To Do">To Do</option>
              <option value="Blocked">Blocked</option>
            </select>
          </span>
          <span className="float-end">
            <button className="btn btn-primary btn-sm ">+ New Task</button>
          </span>
        </div>
      </section>
      <section className="pb-3 px-2 ">
        <table className="table border rounded-2">
          <thead>
            <tr>
              <th className="table-light" scope="col">
                Tasks
              </th>
              <th className="table-light" scope="col">
                Owners
              </th>
              <th className="table-light" scope="col">
                Priority
              </th>
              <th className="table-light" scope="col">
                Due On
              </th>
              <th className="table-light" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tasksFromProject
              ? tasksFromProject.map((task, index) => (
                  <tr key={index}>
                    <th scope="row">{task.name}</th>{" "}
                    <th>
                      {" "}
                      {task.owners.map((owner) => (
                        <span
                          key={owner._id}
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
                          {owner.name.charAt(0)}
                        </span>
                      ))}
                    </th>
                    <th>
                      <span
                        className={
                          task.priority === "High"
                            ? "bg-danger-subtle text-danger-emphasis rounded-pill fw-normal px-2 py-1 "
                            : task.priority === "Medium"
                            ? "bg-emphasise-purple-text-purple rounded-pill fw-normal px-2 py-1"
                            : "bg-body-tertiary rounded-pill fw-normal px-2 py-1"
                        }
                      >
                        {task.priority ? task.priority : "Medium"}
                      </span>
                    </th>
                    <th>{task?.createdAt.split("T").slice(0, 1)}</th>
                    <th>
                      <span
                        className={
                          task.status === "Completed"
                            ? "bg-success-subtle text-success-emphasis rounded fw-normal px-2 py-1 "
                            : task.status === "Blocked"
                            ? "bg-danger-subtle text-danger-emphasis rounded fw-normal px-2 py-1"
                            : task.status === "In Progress"
                            ? "bg-warning-subtle text-warning-emphasis fw-normal px-2 py-1"
                            : "bg-body-tertiary rounded fw-normal px-2 py-1"
                        }
                      >
                        {task.status}
                      </span>
                    </th>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Projects;
