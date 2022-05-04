import { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCaretDown} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [x, setX] = useState(123);
  return (
    <ul className="menu menu-vertical p-2 bg-blue-200 w-64">
    {['111', '222', '333'].map((store, i)=>(
      <li className="flex flex-row" key={i}>
        <a onClick={()=>{state.setStores()}}>{store}</a>
        <FontAwesomeIcon icon={faCaretDown} fontSize="24" />
      </li>
    ))}
    </ul>

  )
}
