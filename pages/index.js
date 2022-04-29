import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import Layout from "./components/Layout"

export default function Home() {
  const [ct, setCt] = useState(120);
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="NFV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div>content</div>
    </Layout>
  )
}
