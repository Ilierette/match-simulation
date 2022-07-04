import React from "react";

export const TimerComponent = ({ time }) => {
    return (
        <div className="base-timer">
            <svg className="base-timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer-circle">
                    <circle className="base-timer-path-elapsed" cx="50" cy="50" r="45" />
                </g>
            </svg>
            <span className="base-timer-label">
                {time ? time : <>0</>}
            </span>
        </div>
    )
}