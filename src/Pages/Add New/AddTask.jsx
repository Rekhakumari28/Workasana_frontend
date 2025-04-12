import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProjectsAsync, updateProjectAsync } from "../../Features/projectSlice";
import { fetchTeamsAsync } from "../../Features/teamSlice";
import { addTasksAsync, updateTaskAsync } from "../../Features/taskSlice";
import { fetchUserAsync } from "../../Features/userSlice";
import toast, { Toaster } from "react-hot-toast";

function AddTask() {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [teamName, setTeam] = useState("");
  const [timeout, setTimeout] = useState("");
  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [priority, setPriority] = useState("");
const [taskStatus, setTaskStatus] = useState("")

  const taskId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.teams);
  const { users, statusUser } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);

  const existingTask =
    taskId &&
    tasks?.length > 0 &&
    tasks?.find((task) => task._id == taskId.taskId);

  const existing = Boolean(existingTask);

  useEffect(() => {
    dispatch(fetchUserAsync());
    dispatch(fetchProjectsAsync());
    dispatch(fetchTeamsAsync());
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
      setTaskStatus(existingTask.status || "")
    }
  }, [existingTask, existing]);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prevTag) => [...prevTag, newTag]);
      setNewTag("");
    }
  };

  const handleOwners = (event) => {
    const { checked, value } = event.target;
  
    if (checked) {
      setOwners((prevVal) => [...prevVal, value]);
    } else {
      setOwners((prevVal) => prevVal.filter((user) => user != value));
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();

  if(existing){
    const updateTask = {
      name: taskName,
      project: projectName,
      team: teamName,
      timeToComplete: timeout,
      tags: tags,
      owners: owners,
      priority:priority,
      status: taskStatus,
    };

    dispatch(updateTaskAsync({id:taskId.taskId  , updateTask }));
    toast.success("Task Updated successfully!");
    setTimeout(()=>{
      navigate("/settings")
       },2000)

  }else{
    const newTask = {
      name: taskName,
      project: projectName,
      team: teamName,
      timeToComplete: timeout,
      tags: tags,
      owners: owners,
      priority:priority,
      status: taskStatus,
    };

    dispatch(addTasksAsync({ newTask }));
    toast.success("New task created successfully!");
    setTimeout(()=>{
      navigate("/dashboard")
       },2000)
  }

  };

  return (
    <div className="login-overlay">
      <div className="popup" style={{ width: "55%", margin: "10px auto" }}>
        <div className="content card-background">
          <div className="p-2 ">
            <h4>{existing ? existingTask.name : "Create New Task"}</h4>
            <hr />
            <form onSubmit={handleAddTask}>
              <div className="input-group margin-1">
                <label htmlFor="project" className="input-group-text">
                  Select Project
                </label>
                <select
                  className="form-select"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
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

              <div className="input-group margin-1">
                <label htmlFor="taskName" className="input-group-text">
                  Task Name
                </label>
                <input
                  className=" form-control"
                  type="text"
                  placeholder="Enter Task Name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>

              <div className="input-group margin-1">
                <label htmlFor="team" className="input-group-text">
                  Select Team
                </label>
                <select
                  className="form-select"
                  value={teamName}
                  onChange={(e) =>setTeam(e.target.value)}
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
              <div className="input-group margin-1">
                <label htmlFor="status" className="input-group-text">
                   Status
                </label>
                <select
                  className="form-select"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option value="Dropdown">Dropdown</option>
                  <option value="To Do">To Do</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                  <option value="In Progress">In Progress</option>
                  
                </select>
              </div>

              <div className="input-group margin-1">
                <label htmlFor="owners" className="input-group-text">
                  Owners:
                </label>

                {statusUser === "Loading" && <p>Loading...</p>}
                {users &&
                  users.map(
                    (user) =>
                      user.name &&
                      user.password && (
                        <label className="input-group-text" key={user._id}>
                          {" "}
                          <input
                            onChange={handleOwners}
                            type="checkbox"
                            name="owners"
                            value={user._id}
                            className="form-check-input mx-1"
                          />{" "}
                          {user.name}
                        </label>
                      )
                  )}
              </div>

              <div className="input-group margin-1">
                <label htmlFor="dueDate" className="input-group-text">
                  Tags:
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <div className="input-group-text">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleAddTag}
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              <div className="input-group ">
                {" "}
                {tags?.length > 0 &&
                  tags.map((tag, index) => (
                    <div className="input-group-text" key={index}>
                      {tag}
                    </div>
                  ))}
              </div>

              <div className="input-group margin-1">
                <label htmlFor="estimateTime" className="input-group-text">
                  Estimate Time
                </label>
                <input
                  className=" form-control"
                  type="text"
                  placeholder="Enter Time in Days"
                  value={timeout}
                  onChange={(e) => setTimeout(e.target.value)}
                />
              </div>
              <div className="input-group margin-1">
                <label htmlFor="priority" className="input-group-text">
                  Priority
                </label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Dropdown">Dropdown</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <Link
                className="btn btn-secondary mx-1 float-end"
                to={existing ? "/settings" : "/dashboard"}
              >
                Cancel
              </Link>
              <button className="btn btn-primary mx-1 float-end">{existing ? "Update":"Create"}</button>
            </form>
            <Toaster />
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default AddTask;
