import axios from 'axios';
import React,{useState} from 'react'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [showError,setShowError] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignUp = async ()=>{
    try{

      const res = await axios.post(BASE_URL+"/signUp",{firstName,lastName,emailId:email,password},{withCredentials:true});
     if(res.status === 201){
      navigate("/login")
     }
      

    }
    catch(err){
      if(err.response.status === 400){
        setShowError(true);
      }
    }
  }

  return (
    <div>
      
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
  <legend className="fieldset-legend text-2xl ">Sign Up</legend>

  <label className="label">FirstName</label>
  <input type="text" className="input" placeholder="FirstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />

  <label className="label">LastName</label>
  <input type="text" className="input" placeholder="LastName" value={lastName} onChange={(e)=>setLastName(e.target.value)} />

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

  {
    showError && <p className='text-red-500'>Please Provide Valid Details...</p>
  }

  <button onClick={handleSignUp} className="btn btn-neutral mt-4">Sign Up</button>

  <h3 onClick={()=> navigate("/login")} className='text-center cursor-pointer mt-2 '>Hava an Accound? Login Here</h3>
</fieldset>
    </div>
  )
}

export default SignUp
