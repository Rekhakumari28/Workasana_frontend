import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addTeamsAsync, fetchTeamsAsync, updateTeamAsync } from "../../Features/teamSlice";
import toast from "react-hot-toast";
import { addMembersAsync, fetchMembersAsync } from "../../Features/memberSlice";


export function AddMember({teamId}){
 const dispatch = useDispatch();
 
  const { teams } = useSelector((state) => state.teams);
  const getTeam = teams.find((team) => team._id == teamId);

  const [name, setName] = useState("");

  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const handleAddMember = async (e) => {
    e.preventDefault();

    // Find the member by name
    const matchedMember = members.find(
      (member) => member.name === name || member === name
    );

    if (!matchedMember) {
      alert("Member not found.");
      return;
    }

    const updatedMembers = [
      ...getTeam.members.map((m) => m._id || m),
      matchedMember._id || matchedMember,
    ];

    try {
      await dispatch(
        updateTeamAsync({
          id: getTeam._id,
          updateTeam: { members: updatedMembers },
        })
      ).unwrap();

      setName("");

      window.location.reload()
    } catch (error) {
      console.error("Failed to update team:", error);
    }
  };
return(
    <div className="modal-body">
                <form onSubmit={handleAddMember}>
                  <div className="mb-3">
                    <label  className="col-form-label">
                      Members Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Member Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="modal-footer">
                   
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
              </div>
)
}


function AddTeam() {
  const [teamName, setTeamName] = useState(""); 
  
  const [selectedMembers, setSelectedMembers] = useState(["", "", ""]);
 const {members} = useSelector((state)=>state.members)
  const dispatch = useDispatch();
  
const selectMemberHandler = (member)=>{
  let newMembers = [...members];
   newMembers =  member;
    setSelectedMembers(newMembers)
}

  const handleAddTeam = (e) => {
    e.preventDefault();
     

    dispatch(addTeamsAsync({
      name: teamName,
      members :selectedMembers,
    }));
    setTeamName("");
    setSelectedMembers(["", "", ""]); 
   window.location.reload() 
  };

   useEffect(() => {
    dispatch(fetchTeamsAsync());
    dispatch(fetchMembersAsync())
  }, [dispatch]);

  return (
   <div className="modal-body">
                    <form onSubmit={handleAddTeam}>
                      <div className="mb-3">
                        <label  className="col-form-label">
                          Team Name:
                        </label>
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
                        <label className="col-form-label">
                          Add Members:
                        </label>
                        {members?.map((member) => (
                          <label  key={member._id} >
                          <input
                           
                            type="checkbox"
                            className="input-check my-3 ms-3"
                            placeholder={`Member `}
                            value={member._id}
                            onChange={(e) =>                       
                              selectMemberHandler(e.target.value)
                            }
                          />{" "} {member.name}</label>
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
