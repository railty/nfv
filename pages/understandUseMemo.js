import { useState, useMemo } from "react";

const slow = (n)=>{
  console.log("Calculating...");
  let foo = 0;
  for (let i = 0; i < 1000000000; i++) {
    foo += 1;
  }
  console.log("done...");
  return n+1;
}

const quick = (n)=>{
  return n+1;
}

export default function Home() {
  console.log("refresh");

  const [x, setX] = useState(123);
  const [y, setY] = useState(123);

  const a = quick(x);
  //const b = slow(y);

  const b = useMemo(() => {
    const b = slow(y);
    return b;
  }, [y]);

  return (
    <div>
      <p>x={x}</p>
      <p>y={y}</p>
      <p>a={a}</p>
      <p>b={b}</p>
      <button className="button " onClick={()=>{setX(x+1)}}>incX</button>
      <button className="button " onClick={()=>{setY(y+1)}}>incY</button>
    </div>
  )
}
