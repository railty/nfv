import { useEffect, useState, useContext } from 'react'
import Layout from './components/Layout';

export default function Home() {
  const [stores, setStores] = useState([
    {name:'a',show:true},
    {name:'b',show:false},
  ]);

  const tbl = [];
  for (let i=0; i<1000; i++) tbl.push({name: i, value: i});

  return (
    <div className="bg-blue-200 flex flex-col h-screen">
	  	<div className="bg-red-100 h-8">head</div>
      <div className="bg-red-200 flex-1 flex flex-col min-h-0">

      <div className="bg-blue-100 flex-0">
        <table className="border">
          <thead>
            <tr className=''>
              <th className="tbl-cell w-64">Name</th>
              <th className="tbl-cell w-64">Value</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="bg-blue-200 flex-1 overflow-auto ">

        <table className="border">
          <thead>
            <tr className=''>
              <th className="tbl-cell w-64"></th>
              <th className="tbl-cell w-64"></th>
            </tr>
          </thead>
          <tbody className=''>
            {tbl.map((d)=>(
              <tr>
                <td className="tbl-cell">{d.name}</td>
                <td className="tbl-cell">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      </div>
      <div className="bg-red-300 h-8">foot</div>
    </div>
  )
}
