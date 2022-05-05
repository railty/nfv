import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Login from "../components/Login";
import AppData from "../components/AppData";
import ScreenMessage from "../components/ScreenMessage";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <ScreenMessage value="Initialising User..." />
  if (error) return <ScreenMessage value={"Error:" + {error}} />

  if (user) {
    return (<AppData user={user}/>)
  }
  else return (<Login />)
}
