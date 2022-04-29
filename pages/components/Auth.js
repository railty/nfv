import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserSlash, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Dialog from './Dialog';

function Auth( {children} ){
  const [user, loading, error] = useAuthState(auth);

  const [dialogLogin, setDialogLogin] = useState({
    show: false,
  });

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);  
  
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async ()=>{
    try{
      const res = await signInWithEmailAndPassword(auth, email+'@1.com', password);
      console.log("res = ", res);
    }
    catch(ex){
      console.log("error=", ex);
      console.log("error=", ex.code);
      setMsg(ex.code);
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">>
        <h1>Initialising User...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">>
        <h1>Error: {error}</h1>
      </div>
    );
  }
  if (user) {
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
  }
  else {
    setDialogLogin({show:true});
    return (
      <Dialog state={[dialogLogin, setDialogLogin]}>
        <div className="form-control px-8">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="Type here" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input input-sm input-bordered w-full max-w-xs" />

          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs" />

          <button className="btn btn-sm btn-primary w-1/4 mt-4" onClick={login}>Login</button>
        </div>

        <label className="label">
          <span className="label-text text-red-500">{msg}</span>
        </label>
      </Dialog>
    );
  }
};

export default Auth;