import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchTeamsAsync, updateTeamAsync } from "../../Features/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidenav from "../../Components/Sidenav";
import { AddMember } from "../Add New/AddTeam";
import {
  deleteMembersAsync,
  fetchMembersAsync,
} from "../../Features/memberSlice";

function TeamDetail() {
  const [newName, setNewName] = useState("")
  const teamId = useParams();
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teams);

  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const teamData = teams?.find((team) => team._id == teamId.teamId);
  console.log(teamData);

  useEffect(() => {
    dispatch(fetchTeamsAsync());
  }, []);


  const handleAdd = ()=>{  
   try {
    dispatch(addMembersAsync({name:newName})).unwrap();
    setNewName("")
    toast.success("Member created")
    dispatch(fetchMembersAsync())
   } catch (error) {
    console.error("Failed to add:", error);
   }
}

  const handleRemoveMember = async (id) => {
    // Find the member by name
    const matchedMember = members.find((member) => member._id === id);

    if (!matchedMember) {
      alert("Member not found.");
      return;
    }

    const updatedMembers = [...teamData.members.filter((m) => m._id !== id)];

    try {
      await dispatch(
        updateTeamAsync({
          id: teamData._id,
          updateTeam: { members: updatedMembers },
        })
      ).unwrap();
      window.location.reload();
      toast.success("Member deleted successfully.");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
          style={{ width: "250px" }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <Sidenav />
          </div>
        </div>

        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Sidenav />
        </div>

        <div className="col-12 col-md-9 col-lg-10 p-4">
          <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            <i className="bi bi-list"></i>
          </button>
          <section className="pb-3 px-2">
            {" "}
            <Link className="remove-underline  mx-4" to="/teams">
              <i className="bi bi-arrow-left"></i> Back to Teams
            </Link>
          </section>
          <section className=" px-2">
            <div className="p-4">
              <h3>{teamData?.name}</h3>
              <h4 className="fw-normal fs-5 text-light-gray">MEMBERS</h4>

              {teamData?.members.map((member, index) => (
                <div className="pb-1 row" key={index}>
                  <div className="col-md-4">
                    {" "}
                    <p
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
                      {member.name.charAt(0)}
                    </p>
                    {member.name}
                  </div>
                  {/* <div className="col-md-4">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveMember(member._id)}
                    >
                      Delete
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          </section>
          <section className="pb-3 px-2 row">
            <div className="py-1 col-auto">
              <button
                type="button"
                className="btn btn-primary ms-auto me-2"
                data-bs-toggle="modal"
                data-bs-target="#addNewMember"
                data-bs-whatever="@mdo"
              >
                + Members
              </button>
              
            </div>
            <div className="col-auto" >
              <div className="input-group w-75 mt-1" >
        <input className="form-control" type="text" placeholder="Add member name" onChange={(e)=>setNewName(e.target.value)}/>
        <button className="btn btn-primary" onClick={handleAdd}>Add</button>
        </div>
        
            </div>
            <div className="py-1">
              <div
                className="modal fade"
                id="addNewMember"
                tabIndex="-1"
                aria-labelledby="memberModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="memberModalLabel">
                        Create New Member
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <AddMember teamId={teamData?._id}/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
