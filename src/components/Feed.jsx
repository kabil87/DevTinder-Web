import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from "react";
import UserCart from './UserCart';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector(store => store.feed);
  const navigate = useNavigate();

  const getFeed = async () => {
    // prevent unnecessary API call
    if (users && users.length > 0) return;

    console.log("feed is calling");

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      });

      dispatch(addFeed(res.data.data));

    } catch (err) {
      console.log(err);

      if (err?.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!users || users.length === 0) {
    return (
      <div className='mt-4 text-center font-bold'>
        No More New Users...
      </div>
    );
  }

  return (
    <div>
      <UserCart user={users[0]} />
    </div>
  );
};

export default Feed;