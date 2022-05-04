import { useContext } from "react";
import Table from "./Table";
import { initStore } from "../utils";
import { AppContext } from "./AppData";
import { getHeaders } from "./headers";

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
    const headers = getHeaders(state.profile, state.date, state.cat, state.stores, state.jobStates);
    return (
      <Table cols={headers} rows={state.products}/>
    );
  }
}
