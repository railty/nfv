import { useState, useMemo } from "react";

const nextLetter = (c)=>{
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

export default function Home() {
  console.log("refresh");

  const [date, setDate] = useState('a');
  const [n, setN] = useState(2);


  const genHeaders = (date, n)=>{
    const headers = [];
    let letter = date;
    for (let i=0; i<n; i++) {
      letter = nextLetter(letter);
      headers.push({
        name: letter,
        func: function(){
          console.log(this.name);
        }
      })
    }
    return headers;
  }
  
  const headers = useMemo(()=>{
    return genHeaders(date, n);
  }, [n]);
  
  return (
    <div>
      <div>
        <p>Date={date}</p>
        <button className="button " onClick={()=>{setDate(nextLetter(date))}}>inc Date</button>
      </div>
      <div>
        <p>n={n}</p>
        <button className="button " onClick={()=>{setN(n+1)}}>inc N</button>
      </div>

      {headers.map((h, i)=>{
        return (
          <button key={i} className="button" onClick={()=>h.func()}>{i}</button>
        )
      })}   
    </div>
  )
}
