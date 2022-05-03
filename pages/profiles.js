import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useDocumentData, useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

const allStores = ['1970', '888', '250', '1080', '1116', '1117', '3135'];
function Profiles({ user }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("store-buyer");
  const [stores, setStores] = useState(()=>{
    return allStores.map((sn)=>{
      return {
        name: sn,
        checked: false
      }
    })
  });

  const [profiles, loading, error] = useCollection(collection(db, "profiles"));

  const deleteProfile = async (docId) => {
    await deleteDoc(doc(db, "profiles", docId));
    console.log("success");
  }

  const addProfile = async () => {
    console.log(username, role, stores);

    let userStores = allStores;
    if (role=="store-buyer") userStores = stores.filter((s)=>s.checked).map((s)=>s.name);

    const data = {
      role: role,
      stores: userStores,
    };

    await setDoc(doc(db, "profiles", username+"@1.com"), data);
    console.log("success");
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">>
        <h1>Loading...</h1>
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

  return (
    <div>
      <table><tbody>
        {profiles.docs.map((doc)=>{
          const data = doc.data();
          return (
            <tr key={doc.id}>
              <td className="tbl-cell">{doc.id}</td>
              <td className="tbl-cell">{data.role}</td>
              <td className="tbl-cell">{data.stores.join(", ")}</td>
              <td className="tbl-cell">
                <button className="btn btn-sm btn-primary" onClick={()=>{deleteProfile(doc.id)}}>Delete</button>                      
              </td>
            </tr>
          )
        })}
      </tbody></table>
      
      <label>Username</label>
      <input className="border small-input w-full" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />

      <label>Role</label>
      <select value={role} onChange={(e)=>{setRole(e.target.value)}}>
        <option value="store-buyer">store-buyer</option>
        <option value="buyer">buyer</option>
        <option value="warehouse">warehouse</option>
      </select>

      <label>Stores</label>
      <ul>
        {stores.map((store, i) => {
          return (
            <li key={i}>
              <label> {store.name}</label>
              <input type="checkbox" name={store.name} value={store.name} checked={store.checked} onChange={() => {
                console.log(i);
                stores[i].checked = !stores[i].checked;
                setStores([...stores]);
              }} />
            </li>
          );
        })}
      </ul>
      <br/>
      <button className="btn btn-sm btn-primary" onClick={()=>{
        for (let store of stores) store.checked = true;
        setStores([...stores]);
      }}>Select All</button>      

      <button className="btn btn-sm btn-primary" onClick={()=>{
        for (let store of stores) store.checked = false;
        setStores([...stores]);
      }}>Clear All</button>      

      <button className="btn btn-sm btn-primary" onClick={addProfile}>Add</button>      
    </div>    
  )
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
      <Profiles user={user}/>
    )
  }
  else {
    return (<Login />)
  }
}
