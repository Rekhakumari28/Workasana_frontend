import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../Features/taskSlice";
import toast, { Toaster } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

function TasksList({searchQuery}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const taskStatus = searchParams.get("taskStatus") || "";

  useEffect(() => {
    dispatch(fetchTasksAsync({ taskStatus }));
  }, [taskStatus]);

  const handleFilterByStatus = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("taskStatus", value);
    } else {
      newParams.delete("taskStatus");
    }
    setSearchParams(newParams);
  };
  const findTaskByQuery = searchQuery === "" ? tasks : tasks?.filter(task=> task?.name.toLowerCase().includes(searchQuery.toLowerCase()))


  return (
    <>
      <div className="py-1 ">
        <span className="fw-bold fs-2">Tasks </span>{" "}
        <select
          className="select mb-3"
          onChange={(e) => handleFilterByStatus(e.target.value)}
        >
          <option value="">Filter</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="To Do">To Do</option>
          <option value="Blocked">Blocked</option>
        </select>
        <Link
          className="btn btn-primary float-end btn-sm mt-2 me-2"
          to="/addTask"
        >
          + New Task
        </Link>
      </div>

      <div className="row">
        {status === "Loading" && <p>Loading...</p>}
        {findTaskByQuery?.length > 0 &&
          findTaskByQuery?.map((task, index) => (
            <div className="col-md-4 py-2" key={index}>
              <div
                className="card card-background mt-3 "
                style={{ width: "330px", height: "200px" }}
              >
                <h5>{task.name}</h5>
                <div className=" m-1">Due date: {task.timeToComplete}</div>
                <div className=" m-1">
                 <span className="row ms-1"> Owners: {task.owners.map((owner,index) => (
                    <span className="col-md-1 px-2" key={index}>
                      <span
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
                      </span>{" "}
                     
                    </span>
                  ))}</span> 
                 
                </div>
                <div className="m-1">
                  Team: {task.team.name}
                </div>

                <div className="card-img-overlay p-1">
                  <span
                    className={
                      task.status === "Blocked"
                        ? "text-bg-danger p-1 rounded"
                        : task.status === "Completed"
                        ? "text-bg-primary p-1 rounded"
                        : task.status === "To Do"
                        ? "text-bg-warning p-1 rounded"
                        : "text-bg-info p-1 rounded"
                    }
                  >
                    {task.status}
                  </span>
                </div>

              </div>
            </div>
          ))}
        <Toaster />
      </div>
    </>
  );
}

export default TasksList;
