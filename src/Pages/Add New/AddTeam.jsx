import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTeamsAsync,
  fetchTeamsAsync,
  updateTeamAsync,
} from "../../Features/teamSlice";

import { addMembersAsync, fetchMembersAsync } from "../../Features/memberSlice";
import toast, { Toaster } from "react-hot-toast";

export function AddMember({ teamId }) {
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teams);

  const { members } = useSelector((state) => state.members);

  const getTeam =teams && teams?.length >0 && teams?.find((team) => team._id == teamId);


  const selectMemberHandler = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedMembers((prevVal) => [...prevVal, value]);
    } else {
      setSelectedMembers((prevVal) => prevVal.filter((prev) => prev !== value));
    }
  };

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    console.log(teamId, teamName, selectedMembers);
    try {
      await dispatch(
        updateTeamAsync({
          id: teamId,
          name: teamName,
          members: selectedMembers,
        })
      ).unwrap();
      setSelectedMembers([]);
      setTeamName("");
     setTimeout(()=>{
      window.location.reload()
     }, 2000)
    } catch (error) {
      console.error("Failed to update team:", error);
    }
  };
  return (
    <div className="modal-body">
     
     
      <form onSubmit={handleAddMember}>
        <div className="mb-3">

          {members && members?.length > 0 && members?.map((member) => (
            <label key={member._id}>
              <input
                type="checkbox"
                className="input-check my-3 ms-3"
                placeholder={`Member `}
                onChange={selectMemberHandler}
                value={member._id}
              />{" "}
              {member.name}
            </label>
          ))}
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            Add Member
          </button>
        </div>
      </form>
       <Toaster />
    </div>
  );
}

function AddTeam() {
  const [teamName, setTeamName] = useState("");

  const [selectedMembers, setSelectedMembers] = useState([]);
  const { members } = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const selectMemberHandler = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedMembers((prevVal) => [...prevVal, value]);
    } else {
      setSelectedMembers((prevVal) => prevVal.filter((prev) => prev !== value));
    }
  };
  console.log(selectedMembers);
  const handleAddTeam = (e) => {
    e.preventDefault();

    dispatch(
      addTeamsAsync({
        name: teamName,
        members: selectedMembers,
      })
    );
    setTeamName("");
    setSelectedMembers([]);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    dispatch(fetchTeamsAsync());
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  return (
    <div className="modal-body">
      <form onSubmit={handleAddTeam}>
        <div className="mb-3">
          <label className="col-form-label">Team Name:</label>
          <input
            type="text"
            className="form-control"
            id="recipient-name"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="col-form-label">Add Members:</label>
          {members?.map((member) => (
            <label key={member._id}>
              <input
                type="checkbox"
                className="input-check my-3 ms-3"
                placeholder={`Member `}
                onChange={selectMemberHandler}
                value={member._id}
              />{" "}
              {member.name}
            </label>
          ))}
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            Save Team
          </button>
        </div>
      </form>
     
    </div>
  );
}

export default AddTeam;
