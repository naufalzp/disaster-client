import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/AuthSlice";
import Swal from "sweetalert2";
import Button from "../../components/ui/Button";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
        console.log(form);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://disaster-api.vercel.app/index.php/api/v1/auth/login",
                {
                    email: form.email,
                    password: form.password,
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                const { user, token } = response.data.data;
                dispatch(login({ user, token }));

                Swal.fire({
                    title: "Berhasil!",
                    text: response.data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setForm({
                    email: "",
                    password: "",
                });

                navigate("/admin");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("Something Wrong!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-indigo-800'>
            <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg'>
                <div className='flex flex-col mb-6'>
                    <h2 className='text-3xl font-bold text-center text-gray-800'>
                        Login
                    </h2>
                    <small className='text-sm text-gray-500 text-center'>
                        Welcome back! Please login to your account.
                    </small>
                </div>
                {error && (
                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4'>
                        <p>{error}</p>
                    </div>
                )}
                <form className='flex flex-col items-center justify-center'>
                    <div className='mb-4 w-full'>
                        <label htmlFor='email' className='block text-gray-700 pb-2'>
                            Email:
                        </label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            required
                            value={form.email}
                            onChange={handleChange}
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='mb-6 w-full'>
                        <label htmlFor='password' className='block text-gray-700 pb-2'>
                            Password:
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            required
                            value={form.password}
                            onChange={handleChange}
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='flex flex-col justify-center'>
                        <Button
                            className='bg-blue-500 hover:bg-blue-700 px-6'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </Button>

                        <div className='flex flex-row gap-2 pt-8'>
                            <p className='text-lg'>Don&apos;t have an account?</p>
                            <Link
                                to='/register'
                                className='text-blue-700 font-semibold text-lg ease-in-out duration-150'
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
