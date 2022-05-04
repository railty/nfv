import { useContext } from "react";
import Head from 'next/head'
import Navbar from "./Navbar"
import Content from "./Content"
import { AppContext } from "./AppData";

export default function Layout() {
  const state = useContext(AppContext);

  return (
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
  )
}