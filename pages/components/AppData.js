import { db } from '../../firebase';
import { createContext, useState, useEffect } from "react";
import Layout from "./Layout"
import { dates, cats } from "../utils";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';
import { getHeaders } from "./headers";

export const AppContext = createContext();

export default function AppData({ user }) {
  const [cat, setCat] = useState(cats[0].name);
  const [date, setDate] = useState(dates[0]);
  const [stores, setStores] = useState(null);
  const [headers, setHeaders] = useState(null);

  const [profile] = useDocumentData(doc(db, "profiles", user.email));
  const [products] = useCollectionData(collection(db, date, cat, "products"));
  const [jobStates ] = useDocumentData(doc(db, date, cat));

  useEffect(()=>{
    if (stores && jobStates) setHeaders(getHeaders(profile, date, cat, stores, jobStates));
  }, [date, cat, stores, jobStates]);

  if (profile) setStores(profile.stores.map((store)=>({name: store, show: true})));

  const state = {
    user, profile, date, setDate, cats, cat, setCat, stores, setStores, headers, products,
    role: profile?.role,
  };

  if (profile && products && jobStates) return (
    <AppContext.Provider value={state}>
      <Layout />
    </AppContext.Provider>    
  )
  else return (
    <div className="h-screen flex justify-center items-center">>
      <h1>Loading...</h1>
    </div>
  ) 
}