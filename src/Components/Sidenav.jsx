import React from "react";
import { NavLink } from "react-router-dom";
import { BiCustomize } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
export default function Sidenav() {
  return (
    <>
      <nav className="sidebar ">
        <h4 className="text-center fs-2 py-2">Workasana</h4>

        <div className="my-4">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })}
            className="ms-5 ps-1 py-2 pe-2 "
            to="/dashboard"
          >
            {" "}
            <i className="bi bi-window-sidebar"></i> Dashboard
          </NavLink>
          <NavLink style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })} className="ms-5 p-2" to="/projects">
            <BiCustomize /> Projects
          </NavLink>
         
          <NavLink style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })} className="ms-5 p-2" to="/teams">
            {" "}
            <i className="me-2 bi bi-person-lines-fill"></i> Teams
          </NavLink>
          <NavLink style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })} className="ms-5 p-2" to="/reports">
            <FaRegChartBar /> Reports
          </NavLink>
          <NavLink style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })} className="ms-5 p-2" to="settings">
            <i className="bi bi-gear"></i> Settings
          </NavLink>
        </div>
      </nav>
    </>
  );
}
