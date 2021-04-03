/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Header from "./Components/Header";
import RoundDropDown from "./Components/RoundDropdown";
// import HalfWidthDropdown from "./Components/HalfWidthDropdown";
import helper from "./helper/index";
import Input from "./Components/Input";

const App = () => {

  const [nValue, setnValue] = useState(0);
  const [plainText, setPlainText] = useState("");
  const [cipheredText, setCipheredText] = useState("");
  // const [halfWidth, setHalfWidth] = useState(0);
  const [nKeys, setnKeys] = useState([]);
  const [decipheredText, setDecipheredText] = useState("");

  return (
    <div className="text-center">
      <Header />
      <Input value = {plainText} change = {(value) => setPlainText(value)} />
      <div>eg. 1010101010111011000010010001100110100111001101101100110011011101</div>
      <RoundDropDown value = {nValue} change = {(value) => {setnValue(value); setnKeys(helper.generate_keys(value))}} />  
      {/* <HalfWidthDropdown value = {halfWidth} change = {(value) => setHalfWidth(value)}/> */}
      <div><button className="btn btn-dark mt-2" onClick={() => setCipheredText(helper.DES(plainText, nKeys, nValue))}> Cipher It </button> </div>
      <div className="mt-2"> <b> CIPHERED TEXT = {cipheredText} </b> </div>
      <div><button className="btn btn-dark mt-2" onClick={() => {nKeys.reverse(); setDecipheredText(helper.DES(cipheredText, nKeys, nValue))}}> DeCipher It </button> </div>
      <div className="mt-2"> <b> DECIPHERED TEXT = {decipheredText} </b> </div>
    </div>
  );
}

export default App;
