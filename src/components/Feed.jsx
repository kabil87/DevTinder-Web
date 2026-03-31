import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import {useEffect} from "react"
import UserCart from './UserCart'


const Feed = () => {

  const dispatch = useDispatch();
  const users = useSelector(store => store.feed )

  const getFeed = async () => {
    console.log("feed is calling");
    
    try {
      const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res.data.data));

    }
    catch(err){
      console.log(err);    
    }

  }

  useEffect(()=>{

    getFeed();

  },[])

  if(users?.length <= 0) return <div className='mt-4 text-center font-bold'>No More New Users...</div>

  return (
    
    users &&
    <div className=''>

      <UserCart user={users[0]} />

    </div>
  )
}

export default Feed
