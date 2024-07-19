import React from 'react'
import authservice from '../../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import  { login } from '../../Store/Authslice'
import { useNavigate } from 'react-router-dom'




function Loginbtn(userdata) {
  
  const navigate = useNavigate()

 const dispatch = useDispatch()

  const loginhandler = () =>{
    authservice.login(userdata.email,userdata.password)
    .then(()=>{
      dispatch(login(userdata))
      navigate("/")
      

    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <button  className=' px-7 py-4 bg-slate-700 text-white'
    onClick={loginhandler}>Login</button>
  )
}

export default Loginbtn