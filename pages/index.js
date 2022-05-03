import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Login from "./components/Login";
import Layout from "./components/Layout";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { collection, doc } from 'firebase/firestore';

function ProfileLoading({ user }) {
  const [profile, loading, error] = useDocumentData(doc(db, "profiles", user.email), {snapshotListenOptions: { includeMetadataChanges: true }});

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
      <Layout user={user} profile={profile}/>
    )
  }
  else {
    return (<Login />)
  }
}

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
      <ProfileLoading user={user}/>
    )
  }
  else {
    return (<Login />)
  }
}
