import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";
import Menu from "./Menu";
import Toolbar from "./Toolbar";
import { dates, stores, initStore } from "../utils";
import { AppContext } from "./Layout";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { query, orderBy, limit, getFirestore, collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';

export default function Data() {
  const state = useContext(AppContext);
  const [products, loading, error] = useCollectionData(collection(db, state.date, state.cat, "products"), {snapshotListenOptions: { includeMetadataChanges: true }});

  console.log(products);
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
        <table>
          <thead>

          </thead>
          <tbody>
            {products.map((p)=>(
                <tr key={p.code}>
                  <td>{p.code}</td>
                  <td>{p.name}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      );
    }
  }
  else return null;

}