import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchProjectsAsync,
  updateProjectAsync,
} from "../../Features/projectSlice";
import { fetchTeamsAsync } from "../../Features/teamSlice";
import { addTasksAsync, updateTaskAsync } from "../../Features/taskSlice";
import { fetchUserAsync } from "../../Features/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { fetchMembersAsync } from "../../Features/memberSlice";

function AddTask({ taskId }) {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [teamName, setTeam] = useState("");
  const [timeout, setTimeout] = useState("");
  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [priority, setPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.teams);
  const { members } = useSelector((state) => {
    return state.members;
  });


  const { tasks } = useSelector((state) => state.tasks);

  const existingTask =
    taskId && tasks?.length > 0 && tasks?.find((task) => task._id == taskId);

  const existing = Boolean(existingTask);

  useEffect(() => {
    dispatch(fetchUserAsync());
    dispatch(fetchProjectsAsync());
    dispatch(fetchTeamsAsync());
    dispatch(fetchMembersAsync());
  }, []);

  useEffect(() => {
    if (existing) {
      setProjectName(existingTask.project || "");
      setTaskName(existingTask.name || "");
      setTeam(existingTask.team || "");
      setTimeout(existingTask.timeToComplete || "");
      setOwners(existingTask.owners || []);
      setTags(existingTask.tags || []);
      setPriority(existingTask.priority || "");
      setTaskStatus(existingTask.status || "");
    }
  }, [existingTask, existing]);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prevTag) => [...prevTag, newTag]);
      setNewTag("");
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (existing) {
      
      dispatch(updateTaskAsync({ id: taskId,  name: taskName,
        project: projectName,
        team: teamName,
        timeToComplete: timeout,
        tags: tags,
        owners: owners,
        priority: priority,
        status: taskStatus, }));
      toast.success("Task Updated successfully!");
      document.querySelector("#addNewTask .btn-close").click();
    } else {      

      dispatch(addTasksAsync({ name: taskName,
        project: projectName,
        team: teamName,
        timeToComplete: timeout,
        tags: tags,
        owners: owners,
        priority: priority,
        status: taskStatus }));
      toast.success("New task created successfully!");
      document.querySelector("#addNewTask .btn-close").click();
    }
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="taskModelLabel">
            Create New Project
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleAddTask}>
            <div className="row mb-3">
              <div className="col-md-3">
                {" "}
                <label htmlFor="project" className="col-form-label">
                  Select Project
                </label>
              </div>
              <div className="col-md-9">
                {" "}
                <select
                  className="form-select"
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                >
                  <option value="Dropdown">Dropdown</option>
                  {projects?.length > 0 &&
                    projects?.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                {" "}
                <label htmlFor="taskName" className="col-form-label">
                  Task Name
                </label>
              </div>
              <div className="col-md-9">
                {" "}
                <input
                  className=" form-control"
                  type="text"
                  placeholder="Enter Task Name"
                  onChange={(e) => setTaskName(e.target.value)}
                  value={taskName}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                {" "}
                <label htmlFor="team" className="col-form-label">
                  Select Team
                </label>
              </div>
              <div className="col-md-9">
                <select
                  className="form-select"
                  onChange={(e) => setTeam(e.target.value)}
                  value={teamName}
                >
                  <option value="Dropdown">Dropdown</option>
                  {teams?.length > 0 &&
                    teams?.map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                {" "}
                <label htmlFor="status" className="col-form-label">
                  Status
                </label>
              </div>
              <div className="col-md-9">
                {" "}
                <select
                  className="form-select"
                  onChange={(e) => setTaskStatus(e.target.value)}
                  value={taskStatus}
                >
                  <option value="Dropdown">Dropdown</option>
                  <option value="To Do">To Do</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                {" "}
                <label htmlFor="owners" className="col-form-label">
                  Owners:
                </label>
              </div>
              <div className="col-md-9">
                <select className="form-select"  onChange={(e) => setOwners(e.target.value)} >
                  <option value="">Select owner</option>
                  {members?.map((owner) => (
                    <option key={owner._id} value={owner._id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                {" "}
                <label htmlFor="dueDate" className="col-form-label">
                  Tags:
                </label>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Tags"
                  onChange={(e) => setNewTag(e.target.value)}
                  value={newTag}
                />
              </div>

              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleAddTag}
                >
                  Add Tag
                </button>
              </div>
            </div>
            <div className="mb-2 row ">
              {" "}
              {tags?.length > 0 &&
                tags.map((tag, index) => (
                  <div className="col-md-3" key={index}>
                    {tag}
                  </div>
                ))}
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                {" "}
                <label htmlFor="estimateTime" className="col-form-label">
                  Estimate Time
                </label>
              </div>
              <div className="col-md-9">
                {" "}
                <input
                  className=" form-control"
                  type="text"
                  placeholder="Enter Time in Days"
                  onChange={(e) => setTimeout(e.target.value)}
                  value={timeout}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3">
                <label htmlFor="priority" className="col-form-label">
                  Priority
                </label>
              </div>
              <div className="col-md-9">
                {" "}
                <select
                  className="form-select"
                  onChange={(e) => setPriority(e.target.value)}
                  value={priority}
                >
                  <option value="Dropdown">Dropdown</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary mx-1 float-end">
                {existing ? "Update" : "Create"}
              </button>
            </div>
          </form>
          <Toaster />
        </div>
      </div>{" "}
    </div>
  );
}

export default AddTask;
