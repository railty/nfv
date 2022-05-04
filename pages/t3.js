import { useEffect, useState, useContext } from 'react'
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Data({ user }) {
  const [date, setDate] = useState('2022-05-03');

  const [ jobStates ] = useDocumentData(doc(db, date, 'fruits'));

  const test = async ()=>{
    setDate('2022-05-02');
  }

  if (jobStates){
    console.log("jobStates=", jobStates['250']);
    console.log("jobStates=", jobStates['888']);
    return (
      <div className="bg-blue-200 flex flex-col h-screen">
        <p>250 - {jobStates['250']}</p>
        <p>888 - {jobStates['888']}</p>

        <button className="btn" onClick={test}>test</button>
      </div>
    );
  }
  else return null;
}

export default function Home() {
  const [ user ] = useAuthState(auth);
  if ( user ) return ( <Data user={user}/>);
  else  return null;
}
