/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Header from "./Components/Header";
import RoundDropDown from "./Components/RoundDropdown";
import HalfWidthDropdown from "./Components/HalfWidthDropdown";
import helper from "./helper/index";
import Input from "./Components/Input";

const App = () => {

  const [nValue, setnValue] = useState(0);
  const [plainText, setPlainText] = useState("");
  const [cipheredText, setCipheredText] = useState("");
  const [halfWidth, setHalfWidth] = useState(0);
  const [nKeys, setnKeys] = useState([]);
  const [message, setMessage] = useState("");
  const [decipheredText, setDecipheredText] = useState("");

  const decrypt = () => {
    nKeys.reverse();
    setDecipheredText(helper.DES(cipheredText, nKeys, nValue));
  }

  return (
    <div className="text-center">
      <Header />
      <Input value = {plainText} placeholder = "Plain Text" change = {(value) => setPlainText(value)} />
      <RoundDropDown value = {nValue} change = {(value) => setnValue(value)} />
      <HalfWidthDropdown value = {halfWidth} change = {(value) => setHalfWidth(value)}/>
      <button className="btn btn-dark mt-2" onClick={() => {setnKeys(helper.generate_keys(nValue)); setMessage("KEYS GENERATED")}}> Generate {nValue} keys </button>
      <div className="mt-2"> {message} </div>
      <div><button className="btn btn-dark mt-2" onClick={() => setCipheredText(helper.DES(plainText, nKeys, nValue))}> Cipher It </button> </div>
      <div className="mt-2"> <b> CIPHERED TEXT = {cipheredText} </b> </div>
      <div><button className="btn btn-dark mt-2" onClick={decrypt}> DeCipher It </button> </div>
      <div className="mt-2"> <b> DECIPHERED TEXT = {decipheredText} </b> </div>
    </div>
  );
}

export default App;
