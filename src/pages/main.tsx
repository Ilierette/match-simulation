import { TeamRowContainer } from "container/teamRow";
import { TimerComponent } from "container/timer";
import React, { useEffect, useState } from "react";

export interface TeamProps {
    id: number
    teamOne: string
    teamTwo: string
    teamOneResult: number
    teamTwoResult: number
}

const data = [
    {
        teamOne: "Germany",
        teamTwo: "Poland",
    },
    {
        teamOne: "Brazil",
        teamTwo: "Mexico",
    },
    {
        teamOne: "Argentina",
        teamTwo: "Uruguay",
    }
]

export const MainPage = () => {
    const [teams, setTeams] = useState([]);
    const [time, setTime] = useState(null);
    const [restart, setRestart] = useState(false);
    const [goals, setGoals] = useState(0)

    let startTime
    let interval = React.useRef<any>();;

    useEffect((() => {
        handleReset()
    }), [])

    const handleReset = () => {
        const temp = data.map((i, index) => {
            return ({
                ...i,
                id: index,
                teamOneResult: 0,
                teamTwoResult: 0
            })
        })
        setTeams(temp)
    }


    const handleTimer = () => {
        setRestart(false)
        handleReset()
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
                    const temp = teams.map((team: TeamProps) => { if (team.id === random.id) { return ({ ...team, teamOneResult: team.teamOneResult + 1 }) } else return team })
                    setTeams(temp)
                } else {
                    const temp = teams.map((team: TeamProps) => { if (team.id === random.id) { return ({ ...team, teamTwoResult: team.teamTwoResult + 1 }) } else return team })
                    setTeams(temp)
                }
            }
            if (parseInt(time) == 90) {
                stopTimer()
            }
        }
    }), [time])

    const handleRandom = (list:TeamProps[]) => {
        return list[Math.floor((Math.random() * list.length))]
    }

    useEffect((() => {
        if (teams.length) {
            const temp = teams.map((team:TeamProps) => { return team.teamOneResult + team.teamTwoResult }).reduce((sum, i) => { return sum + i })
            setGoals(temp)
        }
    }), [teams])


    return (
        <div className="container">
            <TimerComponent time={time} />
            {
                time ? restart ? <button className="btn" onClick={handleTimer}>restart</button> : <button className="btn" onClick={stopTimer}>przerwij</button> :
                    <button className="btn" onClick={handleTimer}>start</button>
            }

            <div className="team-container">
                {
                    teams && teams.map((team: TeamProps) => (
                        <TeamRowContainer team={team} key={team.id} />
                    ))
                }
            </div>
            <div>
                Total goals: {goals}
            </div>
        </div>
    )
}