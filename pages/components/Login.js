import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserSlash, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Dialog from './Dialog';

function Login(){
  const [user, loading, error] = useAuthState(auth);

  const [dialogLogin, setDialogLogin] = useState({
    show: false,
  });

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);  
  
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onDialogOK = async () => {
    try{
      const res = await signInWithEmailAndPassword(auth, email, password);
    }
    catch(ex){
      setMsg(ex.code);
    }
  }

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    const userMenu = [
      {
          label: `Logout as ${user.email}`,
          onClick: ()=>signOut(auth)
      }
    ];

    return (
        <>
          <Profile user={user} />
          <button className="px-4" type="button" onClick={() => setShowUserMenu(true)}>
            <FontAwesomeIcon icon={faUser} fontSize="24" color="blue" />
          </button>
          {showUserMenu ? (
            <PopupMenu menu={userMenu} align="right-0" onClose={()=>{setShowUserMenu(false)}}/>
          ) : null}

        </>
    );
  }
  else return (
    <>
    11111111111111
      <button className="btn" className="px-4" type="button" onClick={() => {setMsg(""); setShowLoginDialog(true)}}>
        <FontAwesomeIcon icon={faUserSlash} fontSize="24" color="lightblue" />
      </button>

      <Dialog state={[dialogLogin, setDialogLogin]} >        
        <form>
          <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" className="input"/>
          <input type="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" className="input"/>
          { <div dangerouslySetInnerHTML={{ __html: msg }} /> }
        </form>
      </Dialog>
    </>
  );
};

export default Login;