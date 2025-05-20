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
      console.log(addTeam);
      dispatch(addTeamsAsync({ addTeam }));
      toast.success("Team added Successfully!");
      setTimeout(() => {
        navigate("/teams");
      }, 2000);
    }
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="taskModelLabel">
            {existing ? "Update Team" : "Create New Team"}{" "}
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form onSubmit={handleAddTeam}>
          <div className="row mt-2">
            <div className="col-md-3 ">
              <label htmlFor="projectName" className="ms-2 col-form-label">
                Team Name
              </label>
            </div>
            <div className="col-md-8">
              {" "}
              <input
                className=" form-control "
                type="text"
                placeholder="Enter Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <label htmlFor="password" className="ms-2 col-form-label">
                Members
              </label>
            </div>
            <div className="col-md-5">
              <input
                className="form-control mt-2"
                type="text"
                placeholder="Member Name"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
            </div>
            <div className="col-md-3 ">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mt-2 py-2"
                onClick={handleAddMember}
              >
                Add Member
              </button>
            </div>

            <div className="col-md-12">
              <ul className="list-group my-2">
                {" "}
                {members?.length > 0 &&
                  members.map((member, index) => (
                    <li className="list-group-item mx-3" key={index}>
                      {member}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary mx-1 float-end" type="submit">
              {existing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeam;
