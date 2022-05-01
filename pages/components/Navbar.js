import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";
import Menu from "./Menu";
import { dates, stores } from "../utils";
import { AppContext } from "./Layout";

export default function Navbar() {
  const state = useContext(AppContext);

  return (
    <div className="navbar bg-base-500">
      <div className="flex-none visible md:invisible">
        <div className="dropdown dropdown p-2">
          <button tabIndex="0" className="px-4" type="button">
            <FontAwesomeIcon icon={faBars} fontSize="24" color="blue" />
          </button>
          <Menu />
        </div>
      </div>
      
      <div className="flex-1">
        <img className="invisible md:visible" src="logo.png"/>
        <Menu direction="h" />
      </div>

      <div className="flex-none">
        <Profile />
      </div>
    </div>
  )
}