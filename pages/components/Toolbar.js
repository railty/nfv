import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "./Layout";
import { dates, stores } from "../utils";

export default function Toolbar(){
  return (
    <ul tabIndex="0" className="invisible md:visible dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80 menu-horizontal">
      <li>
        <button className="btn btn-sm">test</button>
      </li>

      <li>
        <button className="btn btn-sm">test2</button>
      </li>
    </ul>
  )
};

