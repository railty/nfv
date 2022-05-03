import { useEffect, useState, useContext } from 'react'
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Data({ user }) {

  const test = async ()=>{
    console.log("111111");
    const x = doc(db, '2022-05-02', 'fruits', "products", '03');
    console.log("x=", x);
    await updateDoc(x, {
      order: 3
    });

    await updateDoc(x, {
      "warehouse.inventory": 11
    });

  }

  return (
    <div className="bg-blue-200 flex flex-col h-screen">
      cdasdasdasd
      <button className="btn" onClick={test}>test</button>
    </div>
  );
}

export default function Home() {
  const [ user ] = useAuthState(auth);

  if ( user ) return ( <Data user={user}/>);
  else  return null;
}
