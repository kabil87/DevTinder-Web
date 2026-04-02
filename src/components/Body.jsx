import { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);

  const fetchUser = async () => {
    if (user) {
      console.log("User already exists");
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);

      if (err?.response?.status === 401) {
        console.log("Redirecting to login...");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;