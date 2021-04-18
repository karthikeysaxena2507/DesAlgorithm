/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Header from "./Components/Header";
// import HalfWidthDropdown from "./Components/HalfWidthDropdown";
import helper from "./helper/index";
import Input from "./Components/Input";

const App = () => {

  const [plainText, setPlainText] = useState("");
  const [cipheredText1, setCipheredText1] = useState("");
  const [cipheredText8, setCipheredText8] = useState("");
  const [cipheredText16, setCipheredText16] = useState("");
  const [cipheredText32, setCipheredText32] = useState("");
  const [message, setMessage] = useState("");
  // const [halfWidth, setHalfWidth] = useState(0);
  const [keys1, setKeys1] = useState([]);
  const [keys8, setKeys8] = useState([]);
  const [keys16, setKeys16] = useState([]);
  const [keys32, setKeys32] = useState([]);
  const [decipheredText1, setDecipheredText1] = useState("");
  const [decipheredText8, setDecipheredText8] = useState("");
  const [decipheredText16, setDecipheredText16] = useState("");
  const [decipheredText32, setDecipheredText32] = useState("");

  const setCipheredText = () => {
   setCipheredText1(helper.DES(plainText, keys1, 1));
   setCipheredText8(helper.DES(plainText, keys8, 8));
   setCipheredText16(helper.DES(plainText, keys16, 16));
   setCipheredText32(helper.DES(plainText, keys32, 32));
  }

  const setDecipheredText = () => {
    keys1.reverse();
    keys8.reverse();
    keys16.reverse();
    keys32.reverse();
    setDecipheredText1(helper.DES(cipheredText1, keys1, 1));
    setDecipheredText8(helper.DES(cipheredText8, keys8, 8));
    setDecipheredText16(helper.DES(cipheredText16, keys16, 16));
    setDecipheredText32(helper.DES(cipheredText32, keys32, 32));
  }

  const generateKeys = () => {
    setMessage("Keys Generated");
    setKeys1(helper.generate_keys(1));
    setKeys8(helper.generate_keys(8));
    setKeys16(helper.generate_keys(16));
    setKeys32(helper.generate_keys(32));
  }

  return (
    <div className="text-center">
      <Header />
      <Input value = {plainText} change = {(value) => setPlainText(value)} />
      <div>eg. 1010101010111011000010010001100110100111001101101100110011011101 (64 bit) </div>
      {/* <HalfWidthDropdown value = {halfWidth} change = {(value) => setHalfWidth(value)}/> */}
      <div><button className="btn btn-dark mt-2" onClick={() => generateKeys()}> Generate Keys </button> </div>
      <div>{message}</div>
      <div><button className="btn btn-dark mt-2" onClick={() => setCipheredText()}> Cipher It </button> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 1 Number of round = {cipheredText1} </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 8 Number of rounds = {cipheredText8} </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 16 Number of rounds = {cipheredText16} </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 32 Number of rounds = {cipheredText32} </b> </div>
      <div><button className="btn btn-dark mt-2" onClick={() => setDecipheredText()}> DeCipher It </button> </div>
      <div className="mt-2"> <b> DECIPHERED TEXT FOR 1 Number of round = {decipheredText1} </b> </div>
      <div className="mt-2"> <b> DECIPHERED TEXT FOR 8 Number of round = {decipheredText8} </b> </div>
      <div className="mt-2"> <b> DECIPHERED TEXT FOR 16 Number of round = {decipheredText16} </b> </div>
      <div className="mt-2"> <b> DECIPHERED TEXT FOR 32 Number of round = {decipheredText32} </b> </div>
    </div>
  );
}

export default App;
