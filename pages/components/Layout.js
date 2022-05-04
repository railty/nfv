import { db } from '../../firebase';
import { createContext, useState, useEffect } from "react";
import Head from 'next/head'
import Navbar from "./Navbar"
import Content from "./Content"
import { dates, cats } from "../utils";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';
import { updateProduct } from "../utils";
import { getHeaders } from "./headers";

export const AppContext = createContext();

export default function Layout({ user, profile }) {
  const role = profile.role;
  const [cat, setCat] = useState(cats[0].name);
  const [date, setDate] = useState(dates[0]);
  const [stores, setStores] = useState(()=>{
    return profile.stores.map((store)=>{
      return {
        name: store,
        show: true
      }
    });
  });

  const [headers, setHeaders] = useState(()=>{getHeaders(profile, date, cat, stores)});
  const [products] = useCollectionData(collection(db, date, cat, "products"), {snapshotListenOptions: { includeMetadataChanges: true }});
  const [jobStates ] = useDocumentData(doc(db, date, cat), {snapshotListenOptions: { includeMetadataChanges: true }});

  useEffect(()=>{
    setHeaders(getHeaders(profile, date, cat, stores, jobStates));
  }, [date, cat, stores, jobStates]);

  const state = {user, profile, role, date, setDate, cats, cat, setCat, stores, setStores, headers, products};

  return (
    <AppContext.Provider value={state}>
      <div className="flex flex-col h-screen">
        <Head>
          <title>NFV</title>
          <meta name="description" content="NFV" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="h-14">
          <Navbar/>
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <Content />
        </div>          
      </div>
    </AppContext.Provider>    
  )
}