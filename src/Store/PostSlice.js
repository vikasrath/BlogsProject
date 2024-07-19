import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : [
        {},{}
    ],

}

 export const PostSlice = createSlice({
    name : "postSlice",
    initialState,
    reducers:{
        addPost : (state,action)=>{
            state.posts.push(action.payload)
            console.log("Updated Posts Array After Add Post:", JSON.parse(JSON.stringify(state.posts)));
        },
        deletePost: (state,action)=>{
             state.posts = state.posts.filter((post)=> post.slug !== action.payload)
             console.log("Updated Posts Array After deletion:", JSON.parse(JSON.stringify(state.posts)));
        }

    }
})

export const {addPost , deletePost} = PostSlice.actions;

export default PostSlice.reducer;