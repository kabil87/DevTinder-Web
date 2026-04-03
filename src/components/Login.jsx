
import axios from "axios";
import {useState} from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {

  //"akshay@gmail.com"
  //"Akshay@1234"

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState();

    const handleLogin = async() => {

        try {
          const res = await axios.post(BASE_URL+"/login",{
            emailId : email,
            password
        },{withCredentials : true});

        dispatch(addUser(res.data));
        navigate("/")

        }
        catch(err){
          setError(err?.response?.data || "Something Went Wrong")
          
        }

        
        
    }

  return (
    <div className='flex justify-center mt-10'>

      <fieldset className="fieldset bg-base-300 border-base-200 rounded-box w-xs border p-4">
  <legend className="fieldset-legend text-lg">Login</legend>

  <label className="label">Email</label>

  <input type="email" className="input border border-none" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value) } />

  <label className="label">Password</label>

  <input type="text" className="input border border-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value) } />
  <p className="text-red-500">{error}</p>
  <button className="btn btn-active mt-4" onClick={handleLogin}>Login</button>
  <h3 onClick={()=> navigate("/signup")} className='text-center cursor-pointer mt-2 '>Don't Hava an Accound? SignUp Here</h3>
</fieldset> 
    </div>
  )
}

export default Login
