/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const HalfWidthDropdown = (props) => {

  return (
    <div className="dropdown mt-2">
      <b> Select Half Width </b>
      <br />
      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {props.value}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#" onClick={(e) => props.change(e.target.innerText)}> 16 </a>
        <a className="dropdown-item" href="#" onClick={(e) => props.change(e.target.innerText)}> 32 </a>
        <a className="dropdown-item" href="#" onClick={(e) => props.change(e.target.innerText)}> 64 </a>
      </div>
    </div>
  );
}

export default HalfWidthDropdown;
