import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchTeamsAsync } from "../../Features/teamSlice";
import { useDispatch, useSelector } from "react-redux";

function TeamDetail() {
    const teamId = useParams();
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.teams);
  
  useEffect(() => {
    dispatch(fetchTeamsAsync());
  }, []);

  const teamData = teams?.find((team) => team._id == teamId.teamId);

  return (
    <>
      <section className="pb-3 px-2">
        {" "}
        <Link className="remove-underline  mx-4" to="/teams">
          <i className="bi bi-arrow-left"></i> Back to Teams
        </Link>
      </section>
      <section className="pb-3 px-2">
        <div className="p-4">
          <h3>{teamData?.name}</h3>
          <h4 className="fw-normal fs-5 text-light-gray">MEMBERS</h4>
          {teamData?.members.map((member) => (
            <div className="py-2" key={member._id}>
              <span  style={{
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
                        }}  >{member.charAt(0)}</span> {member}
            </div>
          ))}
        </div>
      </section>
      <section className="pb-3 px-2">
        <Link className="btn btn-primary mx-1 "  to={`/addTeam/${teamData._id}`} >+ Member</Link>       
                  
      </section>
    </>
  );
}

export default TeamDetail;
