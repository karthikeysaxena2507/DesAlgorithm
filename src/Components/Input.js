import React from "react";

const Input = (props) => {

  return (
    <input
        type = "text"
        value = {props.value}
        onChange = {(e) => props.change(e.target.value)}
        placeholder = "Plain Text (in 64 Bit Binary)"
        style={{width: "45%"}}
    />
  );
}

export default Input;
