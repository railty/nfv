import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";

export default function Profile(){
  const [user] = useAuthState(auth);
  return (
    <div className="dropdown dropdown-end p-2">
      <button tabIndex="0" className="px-4" type="button">
        <FontAwesomeIcon icon={faUser} fontSize="24" color="blue" />
      </button>

      <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64">
        <li><a onClick={()=>{signOut(auth)}}>Logout as {user.email}</a></li>
      </ul>
    </div>
  )
};

