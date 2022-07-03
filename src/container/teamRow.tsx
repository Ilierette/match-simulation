import React from "react";

export const TeamRowContainer = ({ team }) => {
    return (
        <div className="team-row">
            <div>{team.teamOne} vs {team.teamTwo}</div>
            <div className="result">{team.teamOneResult}:{team.teamTwoResult}</div>
        </div>
    )
}