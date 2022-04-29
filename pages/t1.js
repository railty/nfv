import { useEffect, useState, useContext } from 'react'
import Layout from './components/Layout';

export default function Home() {
  const [ct, setCt] = useState(120);
  return (
    <Layout>
      <div>content</div>
    </Layout>
  )
}
