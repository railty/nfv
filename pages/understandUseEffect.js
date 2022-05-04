import { useState, useEffect } from "react";

export default function Home() {
  console.log("refresh");

  const [x, setX] = useState(123);
  const [y, setY] = useState(2*x);

  //this is ok, as setInterval make it run after
  setInterval(()=>{
    setX(x+1);
  }, 1000);
  

  //this is OK, whenever x change, y will change
  useEffect(()=>{
    setY(2*x);
  }, [x]);
  
  //cannot call setX in the same "thread"
  //this will make deadloop, as setY will cause a refresh, and that will cause setY again
  //setX(111);

  //this will make deadloop, as setY will cause a refresh, and that will cause setY again
  //setY(2*x);
  
  return (
    <div>
      <p>{x}-{y}</p>
      <button className="button " onClick={()=>{setX(x+1)}}>incX</button>
      <button className="button " onClick={()=>{setY(y+1)}}>incY</button>
    </div>

  )
}
