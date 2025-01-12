import axios from "axios";
import { useState } from "react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        setError(null);
        try {
            const response = await axios.post(
                "https://disaster-api.vercel.app/index.php/api/v1/auth/register",
                {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            if (response.status === 201) {
                Swal.fire({
                    title: "Berhasil!",
                    text: response.data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setForm({
                    name: "",
                    email: "",
                    password: "",
                });
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
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
                <div className='flex flex-col mb-6'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
                    <small className='text-sm text-gray-500 text-center'>
                        Welcome! Please register to create an account.
                    </small>
                </div>
                {error && (
                    <div className='bg-red-200 p-3 rounded-lg text-red-700 mb-4'>
                        {error}
                    </div>
                )}
                <form>
                    <div className='mb-4'>
                        <label htmlFor='name' className='block text-gray-700 pb-2'>
                            Name:
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            required
                            onChange={handleChange}
                            value={form.name}
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700 pb-2'>
                            Email:
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            required
                            onChange={handleChange}
                            value={form.email}
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='password' className='block text-gray-700 pb-2'>
                            Password:
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            required
                            onChange={handleChange}
                            value={form.password}
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='flex justify-center flex-col'>
                        <Button
                            className='bg-blue-500 hover:bg-blue-700 px-6'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Register"}
                        </Button>

                        <div className='flex flex-row gap-2 pt-8'>
                            <p className='text-lg'>Already have an account?</p>
                            <Link
                                to='/'
                                className='text-[#81689D] font-semibold text-lg hover:text-[#1F2544] ease-in-out duration-150'
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
