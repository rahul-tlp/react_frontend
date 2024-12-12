import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/notes.png';
import user from '../../assets/user.png';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '../Login/login';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.includes('signup')
    const userId = sessionStorage.getItem('userId')

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); 
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setIsLoggedIn(false); 
        navigate('/login'); 
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 bg-orange-100">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-12" alt="Logo" />
                    </Link>

                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/add_notes"
                            className="text-white bg-orange-900 hover:bg-orange-950 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Add Notes
                        </Link>
                        {!localStorage.getItem('token') ? <Link
                            to={`${pathname ? 'login' : 'signup'}`}
                            className="text-white bg-orange-900 hover:bg-orange-950 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            {pathname ? 'Login' : 'SignUp'}
                        </Link> : null}
                        {localStorage.getItem('token') ? <button
                            onClick={handleLogout}
                            className="bg-orange-900 px-4 py-2 rounded-md text-white hover:bg-orange-950 transition"
                        >
                            Logout
                        </button> : null}
                        <Link to={`/update_user/${userId}`} className="flex items-center ml-4">
                        <img src={user} className="mr-3 h-12" alt="Logo" />
                    </Link>
                    </div>
                    <h1 className="text-5xl font-bold text-orange-800">Notes Manager</h1>
                </div>
            </nav>
        </header>
    );
}
