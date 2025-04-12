import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Sidenav from "./Components/Sidenav.jsx";
import Projects from "./Pages/Projects/Projects.jsx";
import Reports from "./Pages/Reports/Reports.jsx";
import Teams from "./Pages/Teams/Teams.jsx";
import Settings from "./Pages/Settings/Settings.jsx";
import TeamDetail from "./Pages/Teams/TeamDetail.jsx";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SighUp/SignUp.jsx";
import AddTask from "./Pages/Add New/AddTask.jsx";
import AddProject from "./Pages/Add New/AddProject.jsx";
import ProtectedRoutes from "./Pages/protectedRoute/ProtectedRoute.jsx";
import AddTeam from "./Pages/Add New/AddTeam.jsx";

function App() {
  return (
    <Router>
      <div>
        <div>
          <Sidenav />
        </div>
        <div className="main">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* ProtectedRoutes */}

            <Route
              path="/dashboard"
              element={<ProtectedRoutes element={<Home />} />}
            />
            <Route
              path="/projects"
              element={<ProtectedRoutes element={<Projects />} />}
            />
            <Route
              path="/projects/:projectId"
              element={<ProtectedRoutes element={<Projects />} />}
            />
            <Route
              path="/reports"
              element={<ProtectedRoutes element={<Reports />} />}
            />
            <Route
              path="/teams"
              element={<ProtectedRoutes element={<Teams />} />}
            />
            <Route
              path="/settings"
              element={<ProtectedRoutes element={<Settings />} />}
            />
            <Route
              path="/teamDetail/:teamId"
              element={<ProtectedRoutes element={<TeamDetail />} />}
            />
            <Route
              path="/addTask"
              element={<ProtectedRoutes element={<AddTask />} />}
            />
            <Route
              path="/addTask/:taskId"
              element={<ProtectedRoutes element={<AddTask />} />}
            />
            <Route
              path="/addProject"
              element={<ProtectedRoutes element={<AddProject />} />}
            />
            <Route
              path="/addProject/:projectId"
              element={<ProtectedRoutes element={<AddProject />} />}
            />
            <Route
              path="/addTeam"
              element={<ProtectedRoutes element={<AddTeam />} />}
            />
            <Route
              path="/addTeam/:teamId"
              element={<ProtectedRoutes element={<AddTeam />} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
