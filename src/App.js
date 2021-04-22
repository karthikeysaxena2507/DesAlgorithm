/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Header from "./Components/Header";
import helper from "./helper/index";
import Input from "./Components/Input";

const App = () => {

  const [plainText, setPlainText] = useState("");
  const [text, setText] = useState("");
  const [cipheredText1, setCipheredText1] = useState("");
  const [cipheredText8, setCipheredText8] = useState("");
  const [cipheredText16, setCipheredText16] = useState("");
  const [cipheredText32, setCipheredText32] = useState("");
  const [cipheredText_1, setCipheredText_1] = useState("");
  const [cipheredText_8, setCipheredText_8] = useState("");
  const [cipheredText_16, setCipheredText_16] = useState("");
  const [cipheredText_32, setCipheredText_32] = useState("");
  const [keys1, setKeys1] = useState([]);
  const [keys8, setKeys8] = useState([]);
  const [keys16, setKeys16] = useState([]);
  const [keys32, setKeys32] = useState([]);
  const [changes1, setChanges1] = useState(0);
  const [changes8, setChanges8] = useState(0);
  const [changes16, setChanges16] = useState(0);
  const [changes32, setChanges32] = useState(0);

  const setCipheredText = () => {
   setCipheredText1(helper.DES(plainText, keys1, 1, plainText.length));
   setCipheredText8(helper.DES(plainText, keys8, 8, plainText.length));
   setCipheredText16(helper.DES(plainText, keys16, 16, plainText.length));
   setCipheredText32(helper.DES(plainText, keys32, 32, plainText.length));
  }

  const generateKeys = () => {
    if(plainText.length !== 32 && plainText.length !== 64 && plainText.length !== 128) {
      alert("Plain Text Length must be 32, 64 or 128");
    }
    else {
      setKeys1(helper.generate_keys(1, plainText.length, ""));
      setKeys8(helper.generate_keys(8, plainText.length, ""));
      setKeys16(helper.generate_keys(16, plainText.length, ""));
      setKeys32(helper.generate_keys(32, plainText.length, ""));
    }
  }

  const printKeys = (props, index) => {
    return <div key={index}> Round {index + 1} = {props} </div>
  }

  const diff = (a,b) => {
    let count = 0, i = 0;
    while (i<a.length)
    {
      if(a[i] !== b[i]) count++;
      i++;
    }
    return count;
  }

  const showEffect = () => {
    const text1 = helper.DES(text, keys1, 1, text.length);
    const text8 = helper.DES(text, keys8, 8, text.length);
    const text16 = helper.DES(text, keys16, 16, text.length);
    const text32 = helper.DES(text, keys32, 32, text.length);
    setCipheredText_1(text1);
    setCipheredText_8(text8);
    setCipheredText_16(text16);
    setCipheredText_32(text32);
    setChanges1(diff(text1, cipheredText1));
    setChanges8(diff(text8, cipheredText8));
    setChanges16(diff(text16, cipheredText16));
    setChanges32(diff(text32, cipheredText32));
  }

  const weakEffect = () => {
    setCipheredText1(helper.DES(plainText, keys1, 1, plainText.length));
    setCipheredText8(helper.DES(plainText, keys8, 8, plainText.length));
    setCipheredText16(helper.DES(plainText, keys16, 16, plainText.length));
    setCipheredText32(helper.DES(plainText, keys32, 32, plainText.length));
  }

  const generate_Keys = (weak_key) => {
    setKeys1(helper.generate_keys(1, plainText.length, weak_key));
    setKeys8(helper.generate_keys(8, plainText.length,weak_key));
    setKeys16(helper.generate_keys(16, plainText.length, weak_key));
    setKeys32(helper.generate_keys(32, plainText.length, weak_key));
  }

  return (
    <div className="text-center mb-5">
      <Header />
      <Input value = {plainText} change = {(value) => setPlainText(value)} />
      <div> eg. 10101010101110110000100100011001101001110011011011001100110111011010101010111011000010010001100110100111001101101100110011011101 (128 bit) </div>
      <div> eg. 1010101010111011000010010001100110100111001101101100110011011101 (64 bit) </div>
      <div> eg. 10101010101110110000100100011001 (32 bit) </div>
      <div> <button className="btn btn-dark mt-2" onClick={() => generateKeys()}> Generate & Print Keys </button> </div>
      <div className="mt-3"> {keys32.map(printKeys)} </div>
      <div> <button className="btn btn-dark mt-2" onClick={() => setCipheredText()}> Cipher It </button> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 1 Number of round = {cipheredText1} </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 8 Number of rounds = {cipheredText8} </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 16 Number of rounds = {cipheredText16} </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 32 Number of rounds = {cipheredText32} </b> </div>
      <h2 className="mt-3"> Avlanche Effect </h2>
      <p> Change any 1 bit in above plain text, then again create cipher text to see avalanche effect</p>
      <input
        type = "text"
        value = {text}
        onChange = {(e) => setText(e.target.value)}
        placeholder = "Above Plain Text with any one bit changed"
        style={{width: "45%"}}
      />
      <div><button className="btn btn-dark mt-2" onClick={() => showEffect()}> Cipher It </button> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 1 Number of round = {cipheredText_1} ({changes1} changes from original cipher text) </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 8 Number of rounds = {cipheredText_8} ({changes8} changes from original cipher text) </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 16 Number of rounds = {cipheredText_16} ({changes16} changes from original cipher text) </b> </div>
      <div className="mt-2"> <b> CIPHERED TEXT FOR 32 Number of rounds = {cipheredText_32} ({changes32} changes from original cipher text) </b> </div>
      <h2 className="mt-3"> Effect of Weak Keys </h2>
      <div>
        <p> if for above 64 bit input, key = 1111111111111111111111111111111111111111111111111111111111111111 is used then </p>
        <div> <button className="btn btn-dark mt-2" onClick={() => generate_Keys("1111111111111111111111111111111111111111111111111111111111111111")}> Generate & Print Keys </button> </div>
        <p> if for above 64 bit input, key = 1111111111111111111111111111111100000000000000000000000000000000 is used then </p>
        <div> <button className="btn btn-dark mt-2" onClick={() => generate_Keys("1111111111111111111111111111111100000000000000000000000000000000")}> Generate & Print Keys </button> </div>
        <p> if for above 64 bit input, key = 0000000000000000000000000000000011111111111111111111111111111111 is used then </p>
        <div> <button className="btn btn-dark mt-2" onClick={() => generate_Keys("0000000000000000000000000000000011111111111111111111111111111111")}> Generate & Print Keys </button> </div>
        <p> if for above 64 bit input, key = 0000000000000000000000000000000000000000000000000000000000000000 is used then </p>
        <div> <button className="btn btn-dark mt-2" onClick={() => generate_Keys("0000000000000000000000000000000000000000000000000000000000000000")}> Generate & Print Keys </button> </div>
        <div className="mt-3"> {keys32.map(printKeys)} </div>
        <div> <button className="btn btn-dark mt-2" onClick={() => weakEffect()}> Cipher It </button> </div>
        <div className="mt-2"> <b> CIPHERED TEXT FOR 1 Number of round = {cipheredText1} </b> </div>
        <div className="mt-2"> <b> CIPHERED TEXT FOR 8 Number of rounds = {cipheredText8} </b> </div>
        <div className="mt-2"> <b> CIPHERED TEXT FOR 16 Number of rounds = {cipheredText16} </b> </div>
        <div className="mt-2"> <b> CIPHERED TEXT FOR 32 Number of rounds = {cipheredText32} </b> </div>
      </div>
    </div>
  );
}

export default App;
