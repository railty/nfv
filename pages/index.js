import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Login from "./components/Login";
import Layout from "./components/Layout";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  
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
      <Layout />
    )
  }
  else {
    return (<Login />)
  }
}
