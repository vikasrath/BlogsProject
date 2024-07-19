import React from 'react'

function Button({
    name,
    type = "button",
    bgColor ="bg-blue-600", // this is a by default classes if anybody pass extra    
    textcolor ="white",     // classes then this will be overwrite
    className = "",
    ...props
}) {
  return (
    <button type={type} className={` ${bgColor} ${textcolor} ${className}  `}{...props}>{name}</button>
  )
}

export default Button