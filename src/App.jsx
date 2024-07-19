import React from 'react'
import { useState,useEffect } from 'react'
import './App.css'
import authservice from './Appwrite/Auth'
import {useDispatch} from "react-redux"
import { login,logout } from './Store/Authslice'
import { Outlet } from 'react-router-dom'
import  {Header,Footer, Loader} from "./Components/index"


function App() {
  
  const [loading,setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authservice.getcurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
          dispatch(logout())
      }
    })
    .finally(()=>setloading(false))

  },[])  

   if(loading){
      return <div><Loader className="mt-4"/></div>
   }
   else{
      return(
        <div className='min-h-screen  bg-gray-400'>
        <div className='w-full '>
          <Header />
          <main>
           <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      )
   }
}

export default App
