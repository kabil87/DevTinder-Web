import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux';
import UserCart from './UserCart';

const Profile = () => {

  const user = useSelector(store =>  store.user);

  return (
    user &&
    <div className='flex justify-center gap-40 '>
      <EditProfile user={user} />
      <div className=''>
        <UserCart user={user} />
      </div>
    </div>
  )
}

export default Profile
