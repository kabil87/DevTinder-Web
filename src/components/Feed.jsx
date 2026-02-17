import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import {useEffect} from "react"
import UserCart from './UserCart'


const Feed = () => {

  const dispatch = useDispatch();
  const users = useSelector(store => store.feed )

  const getFeed = async () => {

    try {
      const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res.data.data));
      console.log("feed is calling");
      

    }
    catch(err){
      console.log(err);    
    }

  }

  useEffect(()=>{

    getFeed();

  },[])

  return (
    users &&
    <div className=''>

      <UserCart user={users[4]} />

    </div>
  )
}

export default Feed
