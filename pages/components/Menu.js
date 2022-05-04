import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFlagCheckered, faXmark, faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "./AppData";
import { dates, cats, updateState } from "../utils";
import Profile from "./Profile";

export default function Menu({ direction }){
  const state = useContext(AppContext);

  direction = direction || 'v';

  return (
    <ul tabIndex="0" className={"bg-blue-200 dropdown-content menu w-100 " + (direction=='h' ? 'menu-horizontal' : '') }>
      <li>
        <a>
          {state.cat}
          <FontAwesomeIcon icon={direction=='h' ? faCaretDown : faCaretRight} fontSize="24" />
        </a>
        <ul className="p-2 bg-blue-200">
          {cats.map((cat)=>(
            <li key={cat.name}>
              <a onClick={()=>{state.setCat(cat.name)}}>{cat.name}</a>
            </li>
          ))}
        </ul>
      </li>

      <li>
        <a>
          {state.date}
          <FontAwesomeIcon icon={direction=='h' ? faCaretDown : faCaretRight} fontSize="24" />
        </a>
        <ul className="p-2 bg-blue-200 w-64">
          {dates.map((dt)=>(
            <li key={dt}>
              <a onClick={()=>{state.setDate(dt)}}>{dt}</a>
            </li>
          ))}
        </ul>
      </li>

      {state.stores.length > 11 && (
        <li>
          <a>
            stores
            <FontAwesomeIcon icon={direction=='h' ? faCaretDown : faCaretRight} fontSize="24" />
          </a>
          <ul className="menu menu-vertical p-2 bg-blue-200 w-40">
            {state.stores.map((store, i)=>(
              <li className="" key={i}>
                <a onClick={(e)=>{
                  e.preventDefault();
                  let stores = state.stores;
                  stores[i].show = !(stores[i].show);
                  state.setStores([...stores]);
                  return false;
                }}>
                  {store.show ? <FontAwesomeIcon icon={faCheck} fontSize="24" /> : <FontAwesomeIcon icon={faXmark} fontSize="24" />}
                  {store.name}
                </a>
              </li>
            ))}
          </ul>
        </li>
      )}

      <li className="bg-blue-400">
        <a className="" onClick={()=>{
          let store;
          if (state.profile.role == 'warehouse') store = 'warehouse';
          else if (state.profile.role == 'buyer') store = 'buyer';
          else store = state.stores[0].name;

          updateState(state.date, state.cat, store, 'completed');
        }}>
          <FontAwesomeIcon icon={faFlagCheckered} fontSize="24" />
        </a>
      </li>

    </ul>
  )
};

