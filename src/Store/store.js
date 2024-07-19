import {configureStore} from '@reduxjs/toolkit'
import Authslice from './Authslice'
import PostSlice from './PostSlice'

const store = configureStore({
    reducer : {
        auth : Authslice,
        post : PostSlice
    }
})

export default store