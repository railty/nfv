import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserSlash, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Dialog from './Dialog';

export default function Login( ){
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

  return (
    <Dialog title={"Login"}>
      <div className="form-control px-8">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input type="text" placeholder="Type here" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input input-sm input-bordered w-full" />

        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Type here" className="input input-sm input-bordered w-full" />

        <button className="btn btn-sm btn-primary w-1/4 mt-4" onClick={login}>Login</button>
      </div>

      <label className="label">
        <span className="label-text text-red-500">{msg}</span>
      </label>
    </Dialog>
  );
};
