import { useContext } from "react";
import Table from "./Table";
import { initStore } from "../lib/utils";
import { AppContext } from "./AppData";
import { getHeaders } from "../lib/headers";

export default function Content() {
  const state = useContext(AppContext);

  if (state.products.length==0){
    return (
      <div className="flex justify-center items-center mt-20 ">
        <button className="btn btn-primary" onClick={()=>initStore(state.date, state.stores)}>Init {state.date}</button>
      </div>
    )
  }
  else{
    //maybe usememo here?
    //No, did some test with testUseMemoForHeaders.js
    //It is called headers, but in fact it affect all table rendering, not only headers. each cell, when they update, the callback function will need date as a parameter
    //therefore this function indeed depend on all its parameters, so not much performance will be acheved by using useMemo
    const headers = getHeaders(state.profile, state.date, state.cat, state.stores, state.jobStates);
    return (
      <Table cols={headers} rows={state.products}/>
    );
  }
}
