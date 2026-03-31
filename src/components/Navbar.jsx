import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = async() => {

    const res = axios.post(BASE_URL+"/logout",{},{withCredentials:true});
    dispatch(removeUser())
    return navigate("/login");
  }

  return (
    <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <div className='flex'>
        <img className='w-10' src='https://img.icons8.com/?size=100&id=118619&format=png&color=000000'/>
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
    </div>
  </div>
  <div className="flex gap-2">
    
    {user && <div className="dropdown dropdown-end mx-10 flex gap-10 ">
      <div className='pt-2'>Welcome {user.firstName}</div>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl}/>
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connection">Connections</Link></li>
        <li><Link to="/request">Requests</Link></li>
        <li><button onClick={handlelogout}>logout</button></li>
      </ul>
    </div>}
  </div>
</div>
  )
}

export default Navbar;
