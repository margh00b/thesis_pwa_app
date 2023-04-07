import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';


function App() {
  function generateRandomText(n, running) {
    if(!running)
      return '';
    const chunkSize = 10000; // generate the string in chunks of 10000 characters
    const chunks = Math.ceil(n / chunkSize);
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < chunks; i++) {
      if(!running)
        return '';
      let chunk = "";
      for (let j = 0; j < chunkSize && (i * chunkSize + j) < n; j++) {
        chunk += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      result += chunk;
    }
    return result;
  }


  let list = [];
  const [counter, setCounter] = useState(0);
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState("red");
  let intervalId, intervalId2;

  useEffect(() => {
    if (counter % 2) {
      setColor("red");
    } else {
      setColor("blue");
    }
  }, [counter]);


  const startLoop = () => {
    setStarted(true);
    intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1);
    intervalId2 = setInterval(() => {
      list = [...list, generateRandomText(200000)];
    }, 1);
    setTimeout(()=>{
      setStarted(false);
      clearInterval(intervalId); clearInterval(intervalId2);
      list = [];
    }, 30000);  
  };


  return (
    <div className="App" style={{
      flex: 1,
      backgroundColor:
      color, height: '100vh',
      overflow: 'auto',
      justifyContent: 'center',
}}>
    <div className="navbar">
      <ul>
        <li>Marghoob Ahmad - 191ADB066</li>
      </ul>
    </div>
    <div style={{flex: 1, flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <button className="blue-btn" onClick={startLoop}>{started?'Started':'Start'}</button>
    </div>



    </div>
  );
}

export default App;
