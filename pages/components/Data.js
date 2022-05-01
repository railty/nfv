import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";
import Menu from "./Menu";
import Table from "./Table";
import Cell from "./Cell";
import { dates, stores, initStore } from "../utils";
import { AppContext } from "./Layout";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { query, orderBy, limit, getFirestore, collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';

export default function Data() {
  const state = useContext(AppContext);
  const [products, loading, error] = useCollectionData(collection(db, state.date, state.cat, "products"), {snapshotListenOptions: { includeMetadataChanges: true }});
  const [jobStates ] = useDocumentData(doc(db, state.date, state.cat), {snapshotListenOptions: { includeMetadataChanges: true }});

  const sum = products?.map((p)=>{
    let s = 0;
    for (let store of state.stores){
      s = s + p.orders[store];
    }
    return s;
  })

  const bg = (store) => {
    let b = "tbl-cell w-20 ";
    b = b + (jobStates && jobStates[store]=="completed" ? "bg-green-200" : "bg-red-200");
    return b;
  }


  if (products){
    if (products.length==0){
      return (
        <div className="flex justify-center items-center mt-20 ">
          <button className="btn btn-primary" onClick={()=>initStore(state.date)}>Init {state.date}</button>
        </div>
      )
    }
    else{
      return (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-0 overflow-y-scroll">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="tbl-cell w-12">Code</th>
                  <th className="tbl-cell w-16">Name</th>
                  <th className={"w-12 " + bg('warehouse')}>WH</th>

                  {['warehouse', 'buyer'].includes(state.role) && (
                    <>
                      <th className={"w-12 "+bg('buyer')}>QTY</th>
                      <th className="tbl-cell w-16">Sum</th>

                      {state.stores.map((store)=>{
                        return (
                          <th key={store} className={bg(store)} colSpan="2">{store.toUpperCase().replace(/^WM/, '')}</th>
                        )
                      })}
                    </>
                  )}

                  {['store-buyer'].includes(state.role) && (
                    <th className={" " + bg(state.store)} colSpan="2">{state.store}</th>
                  )}

                </tr>
              </thead>
            </table>
          </div>
  
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="tbl-cell w-12"></th>
                  <th className="tbl-cell w-16"></th>
                  <th className={"w-12 " + bg('warehouse')}></th>

                  {['warehouse', 'buyer'].includes(state.role) && (
                    <>
                      <th className={"w-12 "+bg('buyer')}></th>
                      <th className="tbl-cell w-16 "></th>

                      {state.stores.map((store)=>{
                        return (
                          <th key={store} className={bg(store)} colSpan="2"></th>
                        )
                      })}
                    </>
                  )}

                  {['store-buyer'].includes(state.role) && (
                    <th className={bg(state.store)} colSpan="2"></th>
                  )}

                </tr>
              </thead>

              <tbody>
                {products ? (
                  products.map((p, idx)=>{
                    return (
                      <tr key={p.code}>
                        <Cell value={p.code} />
                        <Cell value={p.name} />

                        {state.role == 'warehouse' ? (
                          <Cell value={p.warehouse.inventory} onChange={(v)=>updateProduct(state.date, state.cat, p.code, `warehouse.inventory`, parseFloat(v))} />
                        ) : (
                          <Cell value={p.warehouse.inventory} />
                        )}

                        {state.role == "store-buyer" ? (
                          <>
                            <Cell value={p.inventory[state.store]} onChange={(v)=>updateProduct(state.date, state.cat, p.code, `inventory.${state.store}`, parseFloat(v))} />
                            <Cell value={p.orders[state.store]} onChange={(v)=>updateProduct(state.date, state.cat, p.code, `orders.${state.store}`, parseFloat(v))} />
                          </>
                        ) : (
                          <>
                            {state.role == "buyer" ? (
                              <>
                                <Cell value={p.order} onChange={(v)=>updateProduct(state.date, state.cat, p.code, `order`, parseFloat(v))} />
                                <Cell value={sum[idx]} />

                                {allStores.map((store)=>{
                                  return [
                                    <Cell key={`${store}-inv`} value={p.inventory[store]} />,
                                    <Cell key={`${store}-order`} value={p.orders[store]} onChange={(v)=>updateProduct(state.date, state.cat, p.code, `orders.${store}`, parseFloat(v))} />
                                  ]
                                })}

                              </>
                            ) : (
                              <>
                                <Cell value={p.order} />
                                <Cell value={sum[idx]} />
                                {state.stores.map((store)=>{
                                  return [
                                    <Cell key={`${store}-inv`} value={p.inventory[store]} />,
                                    <Cell key={`${store}-order`} value={p.orders[store]} />
                                  ]
                                })}
                              </>
                          )}
                          </>
                        )}
                      </tr>
                    )
                  })
                ) : null}
              </tbody>
            </table>
          </div>
        </div>      
      );
    }
  }
  else return null;

}