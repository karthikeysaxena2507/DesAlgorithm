/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const RoundDropDown = (props) => {

  return (
    <div className="dropdown mt-2">
      <b> Select No of Rounds </b>
      <br />
      <button 
        className="btn dropdown-toggle" 
        type="button" 
        id="dropdownMenuButton" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false" 
        style={{backgroundColor: "white"}}>
        {props.value}
      </button>
      <span className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#" onClick={(e) => props.change(e.target.innerText)}> 1 </a>
        <a className="dropdown-item" href="#" onClick={(e) => props.change(e.target.innerText)}> 8 </a>
        <a className="dropdown-item" href="#" onClick={(e) => props.change(e.target.innerText)}> 16 </a>
        <a className="dropdown-item" href="#" onClick={(e) => props.change(e.target.innerText)}> 32 </a>
      </span>
    </div>
  );
}

export default RoundDropDown;
