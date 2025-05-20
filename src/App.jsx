import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Projects from "./Pages/Projects/Projects.jsx";
import Reports from "./Pages/Reports/Reports.jsx";
import Teams from "./Pages/Teams/Teams.jsx";
import Settings from "./Pages/Settings/Settings.jsx";
import TeamDetail from "./Pages/Teams/TeamDetail.jsx";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SighUp/SignUp.jsx";
import AddTask from "./Pages/Add New/AddTask.jsx";
import AddProject from "./Pages/Add New/AddProject.jsx";
import AddTeam from "./Pages/Add New/AddTeam.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/teamDetail/:teamId" element={<TeamDetail />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/addTask/:taskId" element={<AddTask />} />
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/addProject/:projectId" element={<AddProject />} />
        <Route path="/addTeam" element={<AddTeam />} />
        <Route path="/addTeam/:teamId" element={<AddTeam />} />
      </Routes>
    </>
  );
}

export default App;
