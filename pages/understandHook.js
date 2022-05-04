import { useState, useEffect } from "react";

const useTick = (seed) => {
  const [tick, setTick] = useState(seed);

  setInterval(()=>{
    setTick(tick+1);
  }, 1000);

  return [tick];
};

export default function Home() {
  console.log("refresh");

  const [tick] = useTick(123);
  
  return (
    <div>
      <p>{tick}</p>
    </div>
  )
}
