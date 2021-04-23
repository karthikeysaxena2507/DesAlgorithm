import React, { useState } from "react";
import helper from "./helper/index";

const App = () => {

  const [plainText, setPlainText] = useState("");
  const [mainKey, setMainKey] = useState("");
  const [text, setText] = useState("");
  const [cipheredText1, setCipheredText1] = useState("");
  const [cipheredText8, setCipheredText8] = useState("");
  const [cipheredText16, setCipheredText16] = useState("");
  const [cipheredText32, setCipheredText32] = useState("");
  const [deCipheredText1, setDeCipheredText1] = useState("");
  const [deCipheredText8, setDeCipheredText8] = useState("");
  const [deCipheredText16, setDeCipheredText16] = useState("");
  const [deCipheredText32, setDeCipheredText32] = useState("");
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
  const [weakKey, setWeakKey] = useState("");
  const [keys_32, setKeys_32] = useState([]);
  const [message, setMessage] = useState("");

  const setCipheredText = () => {
   setCipheredText1(helper.DES(plainText, keys1, 1, plainText.length));
   setCipheredText8(helper.DES(plainText, keys8, 8, plainText.length));
   setCipheredText16(helper.DES(plainText, keys16, 16, plainText.length));
   setCipheredText32(helper.DES(plainText, keys32, 32, plainText.length));
  }

  const setDeCipheredText = () => {
    keys1.reverse();
    keys8.reverse();
    keys16.reverse();
    keys32.reverse();
    setDeCipheredText1(helper.DES(cipheredText1, keys1, 1, cipheredText1.length));
    setDeCipheredText8(helper.DES(cipheredText8, keys8, 8, cipheredText8.length));
    setDeCipheredText16(helper.DES(cipheredText16, keys16, 16, cipheredText16.length));
    setDeCipheredText32(helper.DES(cipheredText32, keys32, 32, cipheredText32.length));
    keys1.reverse();
    keys8.reverse();
    keys16.reverse();
    keys32.reverse();
  }
  
  const generateKeys = () => {
    if(plainText.length !== 32 && plainText.length !== 64 && plainText.length !== 128) {
      alert("Plain Text Length must be 32, 64 or 128");
    }
    else {
      setKeys1(helper.generate_keys(1, plainText.length, "", mainKey));
      setKeys8(helper.generate_keys(8, plainText.length, "", mainKey));
      setKeys16(helper.generate_keys(16, plainText.length, "", mainKey));
      setKeys32(helper.generate_keys(32, plainText.length, "", mainKey));
    }
  }

  const printKeys = (props, index) => {
      return <div key={index}> <b> Key For Round {index + 1} </b> = {props} </div>
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

  const generate_Keys = () => {
    setKeys_32(helper.generate_keys(32, weakKey.length, weakKey, mainKey));
    const keys = helper.generate_keys(32, weakKey.length, weakKey, mainKey);
    let i = 0;
    let st = new Set();
    for (i = 0; i <= keys.length; i++) st.add(keys[i]);
    if(st.size <= 16) setMessage("Given Key is Weak");
    else setMessage("Given key is not Weak");
    console.log(st.size);
  }

  return (
    <div className="text-center mb-5 mt-5">

      {/* HEADING */}
      <h1> DES DEMONSTRATION </h1>

      {/* TAKING INPUT FOR PLAIN TEXT */}
      <input className="mt-3" type = "text" value = {plainText} onChange = {(e) => setPlainText(e.target.value)} placeholder = "Enter Plain Text (in 32, 64, or 128 Bit Binary)" />

      {/* TAKING INPUT FOR KEY */}
      <input className="mt-3" type = "text" value = {mainKey} onChange = {(e) => setMainKey(e.target.value)} placeholder = "Enter Key (in 32, 64, or 128 Bit Binary)" />

      {/* GENERATING KEYS */}
      <div> <button className="btn btn-dark mt-2" onClick={() => generateKeys()}> Generate & Print Keys </button> </div>

      {/* PRINTING KEYS */}
      <div className="mt-3 block"> {(keys32.length > 0) ? keys32.map(printKeys) : <span> No Keys Generated </span>} </div>

      {/* ENCRYPTING THE PLAIN TEXT */}
      <div> <button className="btn btn-dark mt-2" onClick={() => setCipheredText()}> Cipher It </button> </div>
      <div className="block">
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 1 = {cipheredText1} </b> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 8 = {cipheredText8} </b> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 16 = {cipheredText16} </b> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 32 = {cipheredText32} </b> </div>
      </div>


      {/* DECRYPTING THE CIPHER TEXT */}
      <div> <button className="btn btn-dark mt-2" onClick={() => setDeCipheredText()}> DeCipher It </button> </div>
      <div className="block">
        <div className="mt-2"> <b> Deciphered Text for Number of rounds equal to 1 = {deCipheredText1} </b> </div>
        <div className="mt-2"> <b> Deciphered Text for Number of rounds equal to 8 = {deCipheredText8} </b> </div>
        <div className="mt-2"> <b> Deciphered Text for Number of rounds equal to 16 = {deCipheredText16} </b> </div>
        <div className="mt-2"> <b> Deciphered Text for Number of rounds equal to 32 = {deCipheredText32} </b> </div>
      </div>

      {/* AVALANCHE EFFECT PART */}
      <h2 className="mt-5"> Avalanche Effect </h2>
      <p> Change any 1 or 2 bits in above plain text, then again create cipher text to see avalanche effect</p>      
      <input type = "text" value = {text} onChange = {(e) => setText(e.target.value)} placeholder = "Enter Above Plain Text with 1 or 2 bits changed" />
      <div><button className="btn btn-dark mt-3" onClick={() => showEffect()}> Cipher It </button> </div>
      <div className="block">
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 1 = {cipheredText_1} </b> <br /> <i> ({changes1} changes from original cipher text) </i> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 8 = {cipheredText_8} </b> <br /> <i> ({changes8} changes from original cipher text) </i> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 16 = {cipheredText_16} </b> <br /> <i> ({changes16} changes from original cipher text) </i> </div>
        <div className="mt-2"> <b> Ciphered Text for Number of rounds equal to 32 = {cipheredText_32} </b> <br /> <i> ({changes32} changes from original cipher text) </i> </div>
      </div>

      {/* EFFECT OF WEAK KEYS PART */}
      <h2 className="mt-5"> Effect of Weak Keys </h2>
      <div>
      <input type = "text" value = {weakKey} onChange = {(e) => setWeakKey(e.target.value)} placeholder = "Enter Key (32, 64, or 128 bit binary) to generate round keys & check if it is weak or not"/>
        <div> <button className="btn btn-dark mt-3" onClick={() => generate_Keys()}> Generate & Print Keys </button> </div>
        <div className="mt-3"> <b> {message} </b> </div>
        <div className="mt-3 block"> {(keys_32.length > 0) ? keys_32.map(printKeys) : <span> No Keys Generated </span>} </div>
      </div>
    </div>
  );
}

export default App;