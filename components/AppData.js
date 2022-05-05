import { db } from '../firebase';
import { createContext, useState, useEffect } from "react";
import Layout from "./Layout";
import ScreenMessage from "./ScreenMessage";
import { dates, cats } from "../lib/utils";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';

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
    if (profile) setStores(profile.stores.map((store)=>({
      name: store,
      show: true
    })));
  }, [profile]);

  const state = { user, profile, date, setDate, cat, setCat, stores, setStores, headers, products, jobStates };

  //jobStates is undefined if initStore has not been called yet. this is a potential bug
  if (profile && stores && products) return (
    <AppContext.Provider value={state}>
      <Layout />
    </AppContext.Provider>    
  )
  else return <ScreenMessage value="Loading" />
}