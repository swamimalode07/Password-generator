import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const[length,setLength]=useState(6);
  const[numallowed,setNumallowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState("");
  let passsref=useRef(null);

  const passwordGenerator=useCallback(
    ()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numallowed){
        str+="0123456789"
      }
      if(charAllowed){
        str+="!@#$%^&*()"
      }
      for (let i = 1; i<=length;i++) {
        let char=Math.floor(Math.random()*str.length)
        pass+=str.charAt(char)
      }
      setPassword(pass)
      
    }
    ,[length,numallowed,charAllowed,setPassword])

    useEffect(()=>{passwordGenerator()},[length,numallowed,charAllowed,passwordGenerator])

    const copytoclipboard = () => {
      passsref.current?.select()
      navigator.clipboard.writeText(password).then(() => alert("Password copied to clipboard!"));
    };
    

  return (
      <>
      <h1 >Password generator</h1>
      <div>
        <input type="text" readOnly value={password} ref={passsref} />
        <button onClick={copytoclipboard}>Copy</button>
      </div>
      <div>
        <div>
          <input type="range"  min={6} max={20} value={length}onChange={(e) => setLength(Number(e.target.value))}
 />
          <label >length is : {length}</label>
        </div>
        <input type="checkbox" checked={numallowed} onChange={() => setNumallowed((prev) => !prev)} />

        <label htmlFor='numberInput'>Numbers</label>
        
        <input type="checkbox" checked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} />

        <label htmlFor='numberInput'>Characters</label>
      </div>
      

    </>
  )
}

export default App
