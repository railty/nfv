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

export default function Content() {
  const state = useContext(AppContext);

  if (state.products){
    if (state.products.length==0){
      return (
        <div className="flex justify-center items-center mt-20 ">
          <button className="btn btn-primary" onClick={()=>initStore(state.date, state.stores)}>Init {state.date}</button>
        </div>
      )
    }
    else{
      return (
        <Table cols={state.headers} rows={state.products}/>
      );
    }
  }
  else return null;

}