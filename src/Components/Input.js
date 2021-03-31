import React from "react";

const Input = (props) => {

  return (
    <input
        type = "text"
        value = {props.value}
        onChange = {(e) => props.change(e.target.value)}
        placeholder = {props.placeholder}
        style={{width: "45%"}}
    />
  );
}

export default Input;
