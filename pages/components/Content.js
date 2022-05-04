import { useContext } from "react";
import Table from "./Table";
import { initStore } from "../utils";
import { AppContext } from "./AppData";

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