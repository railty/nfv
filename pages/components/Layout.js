import { createContext, useState } from "react";
import Head from 'next/head'
import Navbar from "./Navbar"
import { dates, stores } from "../utils";

export const AppContext = createContext();

export default function Layout() {
  const [date, setDate] = useState(dates[0]);
  const [store, setStore] = useState(stores[0]);
  const [showStores, setShowStores] = useState(stores.map((st)=>({name:st, show:true})));

  const state = {date, setDate, store, setStore, showStores, setShowStores};

  return (
    <div>
      <Head>
        <title>NFV</title>
        <meta name="description" content="NFV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppContext.Provider value={state}>
        <Navbar/>
      </AppContext.Provider>
      
    </div>
  )
}