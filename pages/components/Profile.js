import { useContext } from "react";
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";
import { auth } from '../../firebase';
import { AppContext } from "./AppData";

export default function Profile(){
  const state = useContext(AppContext);
  const user = state.user;
  
  return (
    <div className="dropdown dropdown-end p-2">
      <button tabIndex="0" className="px-4" type="button">
        <FontAwesomeIcon icon={faUser} fontSize="24" color="blue" />
      </button>

      <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-blue-100 rounded-box w-64 ">
        <li className="border border-b-solid border-b-blue-400"><a>Version: 2020.05.03</a></li>
        <li className=""><a onClick={()=>{signOut(auth)}}>Logout as {user.email}</a></li>
      </ul>
    </div>
  )
};

