import { useEffect, useState, useContext, createContext } from 'react'
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Layout() {
  const state = useContext(AppContext);

  console.log(state.products.length);
  console.log(state.jobStates['888']);
  
  const test = ()=>{
    state.setDate('2022-05-02');
  }

  return (
    <div className="bg-blue-200 flex flex-col h-screen">
      <p>250 - {state.jobStates['250']}</p>
      <p>888 - {state.jobStates['888']}</p>
      <p>888 - {state.products.length}</p>
      <p>888 - {state.user.email}</p>
      <p>888 - {state.profile.role}</p>

      <button className="btn" onClick={test}>test</button>
    </div>
  );
}

const AppContext = createContext();

function AppState({ user }) {
  const [date, setDate] = useState('2022-05-03');
  const [cat, setCat] = useState('fruits');

  const [profile] = useDocumentData(doc(db, "profiles", user.email), {snapshotListenOptions: { includeMetadataChanges: true }});
  const [products] = useCollectionData(collection(db, date, cat, "products"));
  const [jobStates ] = useDocumentData(doc(db, date, cat));

  const state = {user, profile, date, setDate, cat, setCat, products, jobStates};

  if (profile && products && jobStates) return (
    <AppContext.Provider value={state}>
      <Layout />
    </AppContext.Provider>
  )
  else  return <div>Loading</div>;
}

export default function Home() {
  const [ user ] = useAuthState(auth);
  if ( user ) return (<AppState user={user} />);
  else  return <div>Loading</div>;
}
