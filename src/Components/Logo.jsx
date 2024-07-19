import React from 'react'
import logo from "../assets/logo.png"

function Logo({width="100px"}) {
  return (
    <div className=' h-16 w-24 py-2 px-3'>
      <img src={logo} className=" h-14" alt="logo" />
    </div>
  )
}

export default Logo