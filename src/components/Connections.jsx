import axios from "axios"
import { BASE_URL } from "../utils/constants"
import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/ConnectionSlice"
import { Link } from "react-router-dom"

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector( (store) => store.connection)

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL+"/user/request/connections",{withCredentials:true})

        dispatch(addConnection(res.data.data));
        console.log(res);
        
        }
        catch(err){
            console.log(err.message);
            
        }
        
    }

    useEffect(() => {
        fetchConnections();
    },[])

    if (! connections) return;
    if (connections.length === 0) return <h1>You Have No Friends!</h1>

  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl mt-2">Connections</h1>

      {
        connections.map((connection,index) => {
            const {_id,firstName,lastName,photoUrl,age,description,gender} = connection;

            return (

                <div className="flex  bg-gray-950 gap-6 mt-6 w-1/2 mx-auto rounded-l-full rounded-r-full" key={index}>
                    
                <img className="w-20 h-20 rounded-full" alt="photo" src={photoUrl} />

                <div>

                    {firstName &&  <h3 className="font-bold">{firstName+" "+lastName}</h3>}
                    <p>{description}</p>
                    {age && gender && <p>{age+", "+gender  }</p>}
                    
                </div>
                <Link to={"/chat/"+_id}>
                <button className="bg-blue-400 rounded-sm px-4 ml-60 mt-5 h-10 text-black font-bold cursor-pointer ">Chat</button>
                </Link>

                </div>
                
            )
        } )
      }
    </div>
  )
}

export default Connections
