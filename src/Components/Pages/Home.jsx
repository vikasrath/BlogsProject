import React, { useEffect, useState } from 'react'
import detabaseservice from '../../Appwrite/Database'
import { Container, Postcard } from "../index"
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        detabaseservice.getPostList([])
            .then((allpost) => {
                if (allpost)
                    setposts(allpost.documents)
               
            })
    }, [])

    return posts.length === 0 ? (
        <div className="w-full py-8 mt-4 text-center bg-[#FFF5E0]">
            <Container>
                <div className="flex flex-wrap justify-center">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold text-[#141E46] hover:text-[#41B06E]">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className='w-full py-8 bg-[#135D66]'>
            <Container>
                <div className='flex flex-wrap w-full'>
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

export default Home
