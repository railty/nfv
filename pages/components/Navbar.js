import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import Auth from "./Auth";

export default function Navbar() {
  return (
    <div className="navbar bg-base-500">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <FontAwesomeIcon icon={faBars} fontSize="24" color="lightblue" />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        <ul class="menu menu-horizontal p-0">
          <li><a>Item 1</a></li>
          <li tabindex="0">
            <a>
              Parent
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul class="p-2 bg-base-100">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="flex-none">
        <Auth />
    </div>
  </div>
)}