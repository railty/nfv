import { db } from '../../firebase';
import { createContext, useState } from "react";
import Head from 'next/head'
import Navbar from "./Navbar"
import Data from "./Data"
import { dates, stores, cats } from "../utils";
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export const AppContext = createContext();

export default function Layout({ user }) {
  const [profile, loading, error ] = useDocumentData(doc(db, "profiles", user?.email), {snapshotListenOptions: { includeMetadataChanges: true }});
  const role = profile?.role;

  const [cat, setCat] = useState(cats[0].name);
  const [date, setDate] = useState(dates[0]);
  const [store, setStore] = useState(stores[0]);
  const [showStores, setShowStores] = useState(stores.map((st)=>({name:st, show:true})));


  const state = {user, profile, role, date, setDate, store, setStore, showStores, setShowStores, cats, cat, setCat, stores};

  return (
    <div>
      <Head>
        <title>NFV</title>
        <meta name="description" content="NFV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppContext.Provider value={state}>
        <Navbar/>
        <Data />
      </AppContext.Provider>
      
    </div>
  )
}