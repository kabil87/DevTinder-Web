import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Request = () => {

    const dispatch = useDispatch();
    const requests = useSelector(store => store.request);

    // const {firstName,lastName,photoUrl,age,description,gender} = requests.fromUserId;

    const fetchRequests = async () => {

        try {

            const res = await axios.get(BASE_URL+"/user/request/received",{withCredentials:true});
            console.log(res.data.data,"uf");
            
            dispatch(addRequest(res?.data?.data))
 
        }
        catch(err){
            console.log(err.message);          
        }
    }

    useEffect(()=>{
        fetchRequests()
    },[]);

    const handleRequest = async(status,_id)=>{
        try{
            const result = await axios.post(BASE_URL+"/request/review"+"/"+status+"/"+_id,{},{withCredentials:true});

            dispatch(removeRequest(_id));
        }
        catch(err){
            console.log(err);
            
        }
    }

  if (! requests) return;
    if (requests.length === 0) return <h1  className='text-center mt-4 font-bold'>You Have No Requests!</h1>

  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl mt-2">Requests</h1>

      {
        requests.map((requests,index) => {
            const {firstName,lastName,photoUrl,age,description,gender} = requests.fromUserId;

            return (

                <div className="flex justify-between items-center  bg-gray-950 gap-6 mt-6 w-1/2 mx-auto rounded-l-full rounded-r-full" key={index}>
                    
                <img className="w-20 h-20 rounded-full" alt="photo" src={photoUrl} />

                <div>

                    {firstName &&  <h3 className="font-bold">{firstName+" "+lastName}</h3>}
                    <p>{description}</p>
                    {age && gender && <p>{age+", "+gender  }</p>}
                    
                </div>

                <div className='flex gap-4 mr-4'>
                    <button onClick={()=>handleRequest("rejected",requests._id)} className="btn btn-primary">Reject</button>
                    <button onClick={()=>handleRequest("accepted",requests._id)} className="btn btn-secondary">Accept</button>
                </div>

                </div>
                
            )
        } )
      }
    </div>
  )
}

export default Request