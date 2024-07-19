import React from 'react'
import {Container, Logo, Logoutbtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function MenuBar({className= ""}) {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: "/", active: true }, 
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
   
      <div className={` ${className} md:hidden  absolute top-15 right-0 w-[50%] min-h-[300px] bg-[#E3FEF7] flex justify-center items-center`}>
          <ul className='flex  flex-col items-center justify-center  '>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name} className=' mt-5'>
                <button
                  onClick={() => navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200 hover:bg-[#77B0AA] hover:border text-[#003C43] rounded-full'
                >
                  {item.name}
                </button>
              </li>
            ) : null)}
            {authStatus && (
              <li className='mt-3 '>
                <Logoutbtn className='bg-[#003C43] text-[#E3FEF7]' />
              </li>
            )}
          </ul> 
      </div>
    
  )
}

export default MenuBar
