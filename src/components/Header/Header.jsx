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
        // Check if a token exists in localStorage
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update the login state based on token presence
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update state
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 bg-orange-100">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-12" alt="Logo" />
                    </Link>

                    <Link to={`/update_user/${userId}`} className="flex items-center">
                        <img src={user} className="mr-3 h-12" alt="Logo" />
                    </Link>

                    {/* Login/Logout Button */}
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
                    </div>
                    <h1 className="text-5xl font-bold text-orange-800">Notes Manager</h1>
                    {/* Navigation Links */}
                    {/* <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive ? 'text-orange-700' : 'text-gray-700'
                                        } hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive ? 'text-orange-700' : 'text-gray-700'
                                        } hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive ? 'text-orange-700' : 'text-gray-700'
                                        } hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/github"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive ? 'text-orange-700' : 'text-gray-700'
                                        } hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Github
                                </NavLink>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </nav>
        </header>
    );
}
