import React from 'react'
import "../Loader/Loaderstyle.css"

function Loader({className}) {

  return (
    <span className={`loader ${className}`}></span>
  )
}

export default Loader