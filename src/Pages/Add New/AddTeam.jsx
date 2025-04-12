import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addTeamsAsync, updateTeamAsync } from "../../Features/teamSlice";
import toast from "react-hot-toast";

function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const dispatch = useDispatch();
  const teamId = useParams();
  const navigate = useNavigate();
  const { teams } = useSelector((state) => state.teams);

  const existTeam =
    teamId &&
    teams?.length > 0 &&
    teams?.find((team) => team._id == teamId.teamId);
  const existing = Boolean(existTeam);

  useEffect(() => {
    if (existing) {
      setTeamName(existTeam.name || "");
      setMembers(existTeam.members || []);
    }
  }, [existTeam, existing]);

  const handleAddMember = () => {
    if (newMember && !members.includes(newMember)) {
      setMembers((prevMember) => [...prevMember, newMember]);
      setNewMember("");
    }
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (existing) {
      const updateTeam = {
        name: teamName,
        members: members,
      };
      
      dispatch(updateTeamAsync({ id: teamId.teamId, updateTeam }));
      toast.success("Team Updated Successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      const addTeam = {
        name: teamName,
        members: members,
      };
      console.log(addTeam)
      dispatch(addTeamsAsync({ addTeam }));
      toast.success("Team added Successfully!");
      setTimeout(() => {
        navigate("/teams");
      }, 2000);
    }
  };

  return (
    <div className="login-overlay">
      <div className="popup">
        <div className="content card-background">
          <div className=" p-4 ">
            <h4>{existing ? "Update Team":"Create New Team"}</h4>
            <hr />

            <form onSubmit={handleAddTeam}>
              <label htmlFor="projectName">Team Name</label>
              <br />
              <input
                className=" form-input"
                type="text"
                placeholder="Enter Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <br />
              <label htmlFor="password">Add Members</label>
              <br />
              <div className="row " style={{ margin: "0 1px" }}>
                <div className="col-md-8 mb-2 px-1">
                  {" "}
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Member Name"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                  />
                </div>
                <div className="col-md-4 my-2 px-1">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleAddMember}
                  >
                    Add Member
                  </button>
                </div>
              </div>
              <ul className="list-group my-2">
                {" "}
                {members?.length > 0 &&
                  members.map((member, index) => (
                    <li className="list-group-item" key={index}>
                      {member}
                    </li>
                  ))}
              </ul>

              <Link className="btn btn-secondary mx-1 float-end" to="/teams">
                Cancel
              </Link>
              <button className="btn btn-primary mx-1 float-end" type="submit">
                {existing ? "Update": "Create"}
              </button>
            </form>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default AddTeam;
