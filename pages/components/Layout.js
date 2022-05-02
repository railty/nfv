import { db } from '../../firebase';
import { createContext, useState, useEffect } from "react";
import Head from 'next/head'
import Navbar from "./Navbar"
import Table from "./Table"
import Content from "./Content"
import { dates, stores, cats } from "../utils";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';


export const AppContext = createContext();

export default function Layout({ user }) {
  const [profile] = useDocumentData(doc(db, "profiles", user?.email), {snapshotListenOptions: { includeMetadataChanges: true }});
  const role = profile?.role;
  const [cat, setCat] = useState(cats[0].name);
  const [date, setDate] = useState(dates[0]);
  const [store, setStore] = useState(stores[0]);
  const [tblProducts, setTblProducts] = useState(null);
  const [showStores, setShowStores] = useState(stores.map((st)=>({name:st, show:true})));
  const [products] = useCollectionData(collection(db, date, cat, "products"), {snapshotListenOptions: { includeMetadataChanges: true }});

  console.log("products=", products);
  const [jobStates ] = useDocumentData(doc(db, date, cat), {snapshotListenOptions: { includeMetadataChanges: true }});

  useEffect(()=>{
    if (products){
      const tblProducts = products.map((p)=>{
        let s = 0;
        for (let store of Object.keys(p.orders)){
          s = s + p.orders[store];
        }
        p.sum = s;
        return p;
      });
      setTblProducts(tblProducts);
    }
  }, [products]);

  let tblHeaders = [
    {
      label: '#',
      field: 'code',
      klass: 'tbl-cell w-8'
    },
    {
      label: 'Name',
      field: 'name',
      klass: 'tbl-cell w-20'
    },
  ];

  const state = {user, profile, role, date, setDate, store, setStore, showStores, setShowStores, cats, cat, setCat, stores, tblHeaders, tblProducts};

  return (
    <AppContext.Provider value={state}>
      <div className="flex flex-col h-screen">
        <Head>
          <title>NFV</title>
          <meta name="description" content="NFV" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="bg-red-100 h-20">
          <Navbar/>
        </div>
        <div className="flex-1 flex flex-col min-h-0">
        </div>          
          <Content />
      </div>
    </AppContext.Provider>    
  )
}