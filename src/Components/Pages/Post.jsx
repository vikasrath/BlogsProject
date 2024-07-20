import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import detabaseservice from '../../Appwrite/Database';
import { Container, Button } from '../index';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import toast from 'react-hot-toast';

export default function Post() {
    const dispatch = useDispatch();
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.Userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            detabaseservice.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        detabaseservice.Deletepost(slug).then((status) => {
            if (status) {
                detabaseservice.deleteFile(post.Images);
                    toast.success("Post Deleted Successfuly")
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-[#135D66] min-h-screen">
            <Container>
                <div className="w-full flex flex-col items-center mb-4 relative border border-[#8DECB4] rounded-xl p-2 bg-[#]">
                    <img
                        src={detabaseservice.getFilePrview(post.Images)}
                        alt={post.Title}
                        className="rounded-xl w-full lg:w-1/3 "
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button name="Edit" bgColor="bg-green-500" className="mr-3 py-3 px-5 rounded-lg" />
                            </Link>
                            <button
                                onClick={deletePost}
                                className="bg-red-500 text-white rounded-lg py-2 px-4"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-center">
                    <h1 className="text-3xl font-bold text-[#E3FEF7]">{post.Title}</h1>
                </div>
                <div className="browser-css text-left w-full lg:w-2/3 mx-auto p-4 text-[#E3FEF7]  md:text-xl bg-[#77B0AA] rounded-lg">
                    {parse(post.Content)}
                </div>
            </Container>
        </div>
    ) : null;
}
