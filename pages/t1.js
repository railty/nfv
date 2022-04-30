import { useEffect, useState, useContext } from 'react'
import Layout from './components/Layout';

export default function Home() {
  const [stores, setStores] = useState([
    {name:'a',show:true},
    {name:'b',show:false},
  ]);

  return (
    <>
      {stores.map((st)=>(
        <p key={st.name}>{st.name}:{st.show.toString()}</p>
      ))}
      {stores.map((st, i)=>(
        <input key={st.name} type="checkbox" checked={st.show} className="checkbox checkbox-sm checkbox-primary" onChange={()=>{
          let s = stores;
          s[i] = {name:st.name, show:!(st.show)};
          console.log(s);
          setStores(s);
        }}/> 
      ))}
      <button className="btn" onClick={()=>{
        console.log("xxxx");
        let x = [...stores];
        console.log(x);
        x[1].name = "xx";
        x[1].show = !(x[1].show);
        console.log(x);
        setStores(x);
      }}>test</button>
    </>
  )
}
