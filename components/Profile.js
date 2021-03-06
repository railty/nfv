import { useContext } from "react";
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";
import { auth } from '../firebase';
import { AppContext } from "./AppData";
import npm from '../package.json';

export default function Profile(){
  const state = useContext(AppContext);
  const user = state.user;
  
  return (
    <div className="dropdown dropdown-end p-2">
      <label tabIndex="0" className="px-4 btn btn-ghost">
        <FontAwesomeIcon icon={faUser} fontSize="24" color="blue" />
      </label>

      <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-blue-100 rounded-box w-64 ">
        <li className="border border-b-solid border-b-blue-400"><a>Version: {npm.version}</a></li>
        <li className=""><a onClick={()=>{signOut(auth)}}>Logout as {user.email}</a></li>
      </ul>
    </div>
  )
};

