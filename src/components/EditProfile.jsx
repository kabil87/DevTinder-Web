import axios from "axios";
import {useState}  from "react"
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({user}) => {  

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [description, setDescription] = useState(user.description);
    const [showToast,setShowToast] = useState(false);
    const [showerrorToast,setShowErrorToast] = useState(false);
    const [error,setError] = useState();
    const dispatch = useDispatch();

    const handleUpdate = async () => {

        try{


           const res = await axios.put(BASE_URL+"/profile/update",{
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            description 

        },{withCredentials:true
        });

        dispatch(addUser(res.data.data));
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 3000);

        }
        catch(err){
            setError(err.response.data)
            setShowErrorToast(true);
            setTimeout(() => {
                setShowErrorToast(false)
            }, 4000);
            console.log(err.response.data);

        }
    }

  return (
    <div>

        <div className='flex justify-center mb-4'>

      <fieldset className="fieldset bg-base-300 border-base-200 rounded-box w-xs border p-4">
  <legend className="fieldset-legend text-lg">Update Profile</legend>

  <label className="label">First Name</label>   
  <input type="text" className="input border border-none" placeholder="Enter Your First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}   />

  <label className="label">Last Name</label>
  <input type="text" className="input border border-none" placeholder="Enter Your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value) }  />

  <label className="label">Age</label>
  <input type="text" className="input border border-none" placeholder="Enter Your Age" value={age} onChange={(e) => setAge(e.target.value) }  />

  <label className="label">Gender</label>
  <input type="text" className="input border border-none" placeholder="Enter Your Gender" value={gender} onChange={(e) => setGender(e.target.value) }  />

  <label className="label">PhotoUrl</label>
  <input type="text" className="input border border-none" placeholder="Enter Your PhotoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value) }  />

  <label className="label">About</label>
  <input type="text" className="input border border-none" placeholder="Enter Something About You!" value={description} onChange={(e) => setDescription(e.target.value) }  />

  <p className="text-red-500">{}</p>    
  <button className="btn btn-neutral mt-4" onClick={handleUpdate} >Update</button>
</fieldset> 
    </div>

    {showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Saved successfully.</span>
  </div>
</div>}

{showerrorToast && <div className="absolute top-0 mt-2 ml-120">

        <div role="alert" className="alert alert-error ">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>{error}</span>
</div>

    </div>
}
      
    </div>
  )
}

export default EditProfile
