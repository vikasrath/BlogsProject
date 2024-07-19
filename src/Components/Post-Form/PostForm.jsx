import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import detabaseservice from '../../Appwrite/Database'
import { Input, Select, Loader } from '../index'

function PostForm({ post }) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, setValue, watch, } = useForm({
        defaultValues: {
            Title: post?.Title || "",
            slug: post?.slug || "",
            Content: post?.Content || "",
            Status: post?.Status || "active"
        }
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true)
        console.log("Form Data:", data);

        if (post) {
            const file = data.Images[0] ? await detabaseservice.uploadFile(data.Images[0]) : null;
            if (file) {
                detabaseservice.deleteFile(post.Images);
            }

            const postUpdated = await detabaseservice.updatePost(post.$id, { ...data, Images: file ? file.$id : undefined })
            if (postUpdated) {
                setLoading(false)
                navigate(`/post/${postUpdated.$id}`)
            }
        } else {
            const file = await detabaseservice.uploadFile(data.Images[0])
            if (file) {
                const userId = userData.$id;
                data.Images = file.$id;

                const postCreated = await detabaseservice.createPost({ ...data, Userid: userId })
                if (postCreated) {
                    setLoading(false)
                    navigate(`/post/${postCreated.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            const slug = value.toLowerCase().replace(/ /g, "-");
            setValue("slug", slug);
            return slug;
        }
    }, [setValue])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "Title") {
                setValue("slug", slugTransform(value.Title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform]);

    return (
        <div className='p-8 bg-[#135D66] '>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-2/3 px-2">
                    <Input
                        label="Title :"
                        lableColor = "text-[#E3FEF7]"
                        placeholder="Title"
                        className="mb-4 bg-[#E3FEF7] outline-none   w-[70%] py-2 rounded-lg px-3"
                        {...register("Title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        lableColor = "text-[#E3FEF7]"
                        placeholder="Slug"
                        className="mb-4 bg-[#E3FEF7] outline-none  w-[70%] py-2 rounded-lg px-3"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    
                   <label htmlFor="Conetent" className='text-[#E3FEF7] md:text-xl '>Content :</label>
                   <textarea
                   placeholder='Discription............'
                    id="Content"  
                    className='mb-4  pt-8 pl-10 mt-8 outline-none w-full  bg-[#E3FEF7] py-2 rounded-lg px-3 h-[200px]'
                    {...register("Content",{required : false})}></textarea>

                </div>
                <div className="w-full lg:w-1/3 px-2 mt-6 lg:mt-0">
                    <div className='bg-[#77B0AA] p-4 rounded-xl'>
                        <Input
                            label="Featured Image :"
                            lableColor = "text-[#E3FEF7]"
                            type="file"
                            className="mb-4 mt-2 bg-[#E3FEF7] py-2 px-3 rounded-lg"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("Images", { required: !post })}
                        />
                        {post && (
                            <div className="w-full mb-4">
                                <img
                                    src={detabaseservice.getFilePrview(post.Images)}
                                    alt={post.Title}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            lableColor = "text-[#E3FEF7]"
                            className="mb-4 bg-[#003C43] text-white text-lg px-4 py-2 rounded-lg"
                            {...register("Status", { required: true })}
                        />
                        <button type='submit' className='w-full lg:w-[70%] mt-4 rounded-xl hover:bg-[#154950] bg-[#135D66] text-white py-2 cursor-pointer'>
                            {post ? "Update" : "Submit"}
                        </button>
                    </div>
                    {loading && <Loader className="mt-5"/>}
                </div>
            </form>
        </div>
    )
}

export default PostForm
