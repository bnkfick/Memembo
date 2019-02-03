import React from "react";


function MsgBar(props) {
  return (
    <div className="msgbar">
      <div className="box-2">{props.msg}</div>
      <div className="box-3">
        <div className="nested">
          <div>SCORE: {props.score}</div>
          <div>TOP SCORE: {props.highScore}</div>
        </div>
      </div>
    </div>
  )
}


export default MsgBar;
