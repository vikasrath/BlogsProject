import React, { useEffect, useState } from 'react'
import {Container, Logo, Logoutbtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MenuBar from '../MenuBar/MenuBar'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const[open , setOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true }, 
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]
  const handleToggle = ()=>{
    setOpen((prev)=>!prev)
  }

  return (
    <>
    <header className=' relative py-3 shadow bg-[#141E46] w-full '>
      <Container>
        <nav className='flex justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* it will show in mobile screen */}
          <button onClick={handleToggle} className=' md:hidden px-4  text-2xl text-center bg-slate-700 text-white '>
                <i className={` ${open ? " fa-solid fa-xmark" : "fa-solid fa-bars"}`}></i>
          </button>

          {/* it will show in tableand laptop screen */}
          <div className=' hidden md:block'>
            <ul className='flex '>
              {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-[#77B0AA] hover:border text-white rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null)}
              {authStatus && (
                <li>
                  <Logoutbtn className='bg-[#E3FEF7] text-[#003C43] hover:bg-[#ceebeead] hover:text-white'/>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
     {open ? (<MenuBar />) : null}
    </>
  )
}

export default Header
