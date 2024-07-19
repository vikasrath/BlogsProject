import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './Store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { SignupForm,LoginForm,Home, AuthLayout ,AllPosts,EditPost,AddPost,Post} from './Components/index.js'

import { allImageLoader } from './Components/Pages/AllPosts.jsx'



const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/login",
        element : (
          <AuthLayout authentication={false}>
             <LoginForm />
          </AuthLayout>
        )
      },
      {
        path : "/signup",
        element : (
          <AuthLayout authentication={false}>
             <SignupForm />
          </AuthLayout>
        )
      },
      {
        path : "/all-posts",
        loader : allImageLoader,
        element : (
                  <AuthLayout authentication = {true}>
                      {" "}
                    <AllPosts/>
                  </AuthLayout>
        ),
      },
      {
        path : "/add-post",
        element : (
                  <AuthLayout authentication = {true}>
                    {" "}
                    <AddPost/>
                  </AuthLayout>
        ),
      },
      {
        path : "/edit-post/:slug",
        element : (
                  <AuthLayout authentication = {true}>
                    {" "}
                      <EditPost/>
                  </AuthLayout>
        ),
      },
      {
        path : "/post/:slug",
        element: <Post/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
