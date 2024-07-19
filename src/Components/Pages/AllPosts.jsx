

import detabaseservice from '../../Appwrite/Database'
import React from 'react'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import Container from '../Container/Container'
import Postcard from '../Postcard'

function AllPosts() {
  const posts = useLoaderData()  // it generates data using loader it's functionality is below

  return (
    <div className='w-full py-8 bg-[#135D66]'>
      <Container>
        <div className='flex flex-wrap -mx-2'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
              <Link to={`/post/${post.$id}`}>
                <Postcard Image={post.Images} title={post.Title} />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts

export const allImageLoader = async () => {
  const allpost = await detabaseservice.getPostList([])
  return allpost.documents
}

















// import React, { useState } from 'react'
// import detabaseservice from '../../Appwrite/Database'
// import Container from '../Container/Container'
// import Postcard from '../Postcard'
// import { Link } from 'react-router-dom'
// import { useLoaderData } from 'react-router-dom'


// function AllPosts() {

//   const posts = useLoaderData()  // it generates data using loader it's functionality is bellow
   
//   return (

//     <div className=' w-full py-8'>
//         <Container>
//             <div className=' flex flex-wrap'>
//                 {posts.map((post)=>(
//                    <div key={post.$id} className=' p-2 w-1/4'>
//                        <Link to={`/post/${post.$id}`}>
//                           <Postcard Image={post.Images}  title={post.Title}/>
//                        </Link>
                         
//                    </div>
//                 ))}

//             </div>
//         </Container>
//     </div>
//   )
// }

// export default AllPosts;

// export const allImageLoader = async()=>{
//      const allpost = await detabaseservice.getPostList([])
//     return allpost.documents;
// }