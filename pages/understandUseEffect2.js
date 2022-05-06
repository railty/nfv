import { useState, useEffect, useMemo } from "react";

export default function Home() {
  console.log("refresh");

  const [x, setX] = useState(123);

  
  const alice = {
    name: 'alice'
  }
  
  //alice will cause a infinite loop, as every re-render, alice will be different (VM will asign a random address to this variable)
  //this apply to objects, functions, arrays 
  useEffect(()=>{
    setX(x+1);
    console.log("useeffect alice");
  }, [alice]);

  //useMemo will make sure the address will stay same across each re-render
  const bob = useMemo(()=>{
    return {
      name: 'bob'
    }
  }, []);

  useEffect(()=>{
    setX(x+1);
    console.log("useeffect bob");
  }, [bob]);

  return (
    <div>
      <p>{x}</p>
      <button className="button " onClick={()=>{setX(x+1)}}>incX</button>
    </div>

  )
}
