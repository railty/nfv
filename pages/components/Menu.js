import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "./Layout";
import { dates, stores } from "../utils";

export default function Menu({ direction }){
  const state = useContext(AppContext);

  direction = direction || 'v';

  return (
    <ul tabIndex="0" className={"invisible md:visible dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80 " + (direction=='h' ? 'menu-horizontal' : '') }>
      <li>
        <a>
          {state.cat}
          <FontAwesomeIcon icon={direction=='h' ? faCaretDown : faCaretRight} fontSize="24" />
        </a>
        <ul className="p-2 bg-base-100">
          {state.cats.map((cat)=>(
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
        <ul className="p-2 bg-base-100 w-64">
          {dates.map((dt)=>(
            <li key={dt}>
              <a onClick={()=>{state.setDate(dt)}}>{dt}</a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
};

