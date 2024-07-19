import React from 'react'
import {useDispatch} from "react-redux"
import { logout } from '../../Store/Authslice'
import authservice from '../../Appwrite/Auth'

function Logoutbtn({className=""}) {
   const dispatch = useDispatch()

const logouthandler = ()=>{

    authservice.logout()
    .then(()=>{
        dispatch(logout())
    })
}

  return (
    <button  className={`px-7 py-4  rounded-lg ${className}`}
    onClick={logouthandler}>Logout</button>
  )
}

export default Logoutbtn