import React, { useEffect, useState } from 'react'
import detabaseservice from '../../Appwrite/Database'
import { useNavigate, useParams } from 'react-router-dom'
import {PostForm,Container}  from "../index"


function EditPost() {

    const[post,setpost]=useState(null)
    const {slug} = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
       if(slug){
            detabaseservice.getPost(slug)
            .then((post)=>{
            if(post){
                setpost(post);
            }
            })
       }
       else{
        navigate("/")
       }
    },[slug])

  return post ? (
    <div className=' py-8 '>
        <Container>
            <PostForm post={post}/>
        </Container>

    </div>
  ) : null

}
export default EditPost