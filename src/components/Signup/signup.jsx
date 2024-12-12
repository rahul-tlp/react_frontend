import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation, useParams } from 'react-router-dom';

const Signup = () => {
    const params = useParams();
    const UserId = params.userId;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        gender: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const isUpdate = location.pathname.includes('update_user')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const getDetails = async(id)=>{
        try {
            const response = await fetch(`http://localhost:8000/user/get/${id}`,{
                method:'GET',
            });
            const details = await response.json()
            setFormData({
                name:details.user.name,
                email:details.user.email,
                mobile:details.user.mobile,
                password:details.user.password,
                gender:details.user.gender || "male",
            })
        } catch (error) {
            console.error(err.message);
        }

    }

    useEffect(()=>{
        getDetails(UserId)
    },[UserId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, mobile, gender } = formData;

        if (!name || !email || !password || !mobile || !gender) {
            setError('All fields are required');
            return;
        }

        if (!/^[a-zA-Z ]+$/.test(name)) {
            setError('Name can only contain letters and spaces');
            return;
        }

        if (!/^[\d]{10}$/.test(mobile)) {
            setError('Mobile number must be a valid 10-digit number');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch(isUpdate ? `http://localhost:8000/user/update/${UserId}` : 'http://localhost:8000/user/add', {
                method: UserId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            setSuccess('Signup successful! Please log in.');
            navigate('/login'); // Redirect to login page

            setFormData({ name: '', email: '', password: '', mobile: '', gender: '' });
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-orange-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">{isUpdate ? 'User Details' : 'Signup'}</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-md text-white ${
                            loading ? 'bg-gray-500' : 'bg-orange-900 hover:bg-orange-950'
                        } transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : `${isUpdate ? "Update" : "SignUp"}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
