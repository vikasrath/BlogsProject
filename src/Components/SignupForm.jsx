import React, { useState } from 'react';
import authservice from '../Appwrite/Auth';
import { useDispatch } from 'react-redux';
import { login as storelogin } from '../Store/Authslice';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Logo, Input, Loader } from '../Components/index';

function SignupForm() {
    const[loading , setloading]= useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const createAccount = async (data) => {
        console.log("User data a:", data);
        setloading(true)
        setError('');
        try {
            const userAccount = await authservice.createAccount(data);
            if (userAccount) {
                const userData = await authservice.getcurrentUser();
                if (userData) {
                    dispatch(storelogin(userData));
                    setloading(false)
                }
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="flex bg-white p-8 items-center justify-center">
                <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                    <div className="mb-6 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
                    <p className="mt-2 text-center text-base text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(createAccount)} className="mt-8">
                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                {...register("name", { required: true })}
                                error={errors.name}
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                                error={errors.email}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                                error={errors.password}
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-3 px-4 rounded-md shadow-md hover:bg-green-600 transition duration-300"
                            >
                                Create Account
                            </button>

                            {loading ? <Loader className="mt-4"/> : null}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignupForm;
