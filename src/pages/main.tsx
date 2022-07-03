import { TeamRowContainer } from "container/teamRow";
import React, { useEffect, useState } from "react";

export interface TeamProps {
    teamOne: string
    teamTwo: string
    teamOneResult: number
    teamTwoResult: number
}

const data = [
    {
        id: 0,
        teamOne: "Germany",
        teamOneResult: 0,
        teamTwo: "Poland",
        teamTwoResult: 0,
    },
    {
        id: 1,
        teamOne: "Brazil",
        teamOneResult: 0,
        teamTwo: "Mexico",
        teamTwoResult: 0,
    },
    {
        id: 2,
        teamOne: "Argentina",
        teamOneResult: 0,
        teamTwo: "Uruguay",
        teamTwoResult: 0,
    }
]

export const MainPage = () => {
    const [teams, setTeams] = useState(data);
    const [time, setTime] = useState(null);
    const [restart, setRestart] = useState(false);
    const [goals, setGoals] = useState(0)

    let startTime
    let interval = React.useRef<any>();;

    useEffect((() => {
        setTeams(data)
    }), [])


    const handleTimer = () => {
        setRestart(false)
        setTeams(data)
        startTime = Date.now();
        interval.current = setInterval(function () {
            setTime(((Date.now() - startTime) / 1000).toFixed(0));
        });
    }
    const stopTimer = () => {
        clearInterval(interval.current)
        setRestart(true)
    }

    useEffect((() => {
        if (time) {
            if (time != 0 && time % 10 == 0) {
                let random = handleRandom(teams)
                const rand = (Math.floor(Math.random() * 100))
                if (rand >= 50) {
                    const temp = teams.map((team) => { if (team.id === random.id) { return ({ ...team, teamOneResult: team.teamOneResult + 1 }) } else return team })
                    setTeams(temp)
                } else {
                    const temp = teams.map((team) => { if (team.id === random.id) { return ({ ...team, teamTwoResult: team.teamTwoResult + 1 }) } else return team })
                    setTeams(temp)
                }
            }
            if (parseInt(time) == 90) {
                stopTimer()
            }
        }
    }), [time])

    const handleRandom = (list) => {
        return list[Math.floor((Math.random() * list.length))]
    }

    useEffect((() => {
        const temp = teams.map((team) => { return team.teamOneResult + team.teamTwoResult }).reduce((sum, i) => { return sum + i })
        setGoals(temp)
    }), [teams])


    return (
        <div className="container">
            {
                time ? restart ? <button className="btn" onClick={handleTimer}>restart</button> : <button className="btn" onClick={stopTimer}>przerwij</button> :
                    <button className="btn" onClick={handleTimer}>start</button>
            }

            {time}
            <div className="team-container">
                {
                    teams.map((team: TeamProps) => (
                        <TeamRowContainer team={team} />
                    ))
                }
            </div>
            <div>
                Total goals: {goals}
            </div>
        </div>
    )
}