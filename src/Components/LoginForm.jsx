import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Logo, Button,Loader } from './index';
import authservice from '../Appwrite/Auth';
import { login as storelogin } from '../Store/Authslice';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userlogin = async (data) => {
    console.log('user data :', data);
    setError('');
    setLoading(true);
    try {
      const session = await authservice.login({ email: data.email, password: data.password });
      console.log('Session after login:', session);

      if (session) {
        const userdata = await authservice.getcurrentUser();
        console.log('User data after login:', userdata);
        if (userdata) {
          dispatch(storelogin(userdata));
          navigate('/');
        } else {
          setError('Failed to retrieve user data.');
        }
      } else {
        setError('Failed to create session.');
      }
    } catch (error) {
      console.log('Error in user login:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-md">
          <div className="mb-6 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Don't have an account?&nbsp;
            <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit(userlogin)} className="mt-8">
            <Input
              label="Email :"
              placeholder="Enter your Email"
              type="email"
              {...register('email', { required: true })}
            />

            <Input
              label="Password"
              placeholder="Enter your Password"
              type="password"
              {...register('password', { required: true })}
            />

            <Button
              type="submit"
              name="Login"
              disabled={loading}
              className="w-full p-4 rounded-lg text-white text-lg bg-green-400 mt-4"
            />

            {loading ? <Loader className="mt-4"/> : null}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
