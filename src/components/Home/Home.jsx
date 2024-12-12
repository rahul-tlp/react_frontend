import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8000/task/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                setData(result.data);
                setFilteredData(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);

        if (selectedCategory) {
            setFilteredData(data.filter(item => item.category === selectedCategory));
        } else {
            setFilteredData(data);
        }
    };

    const handleEdit = (task) => {
        navigate(`/add_notes/${task._id}`, { state: task });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (!confirmDelete) return;
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/task/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
    
            alert('Task deleted successfully!');
            
            // Reload the data after deletion
            const fetchResponse = await fetch('http://localhost:8000/task/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (fetchResponse.ok) {
                const result = await fetchResponse.json();
                setData(result.data);
                setFilteredData(
                    selectedCategory
                        ? result.data.filter(item => item.category === selectedCategory)
                        : result.data
                );
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };
    
    

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <label className="mr-2" htmlFor="category">Filter by Category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border px-4 py-2"
                >
                    <option value="">All Categories</option>
                    <option value="Pending">Pending</option>
                    <option value="Complete">Complete</option>
                </select>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Title</th>
                        <th className="border border-gray-200 px-4 py-2">Content</th>
                        <th className="border border-gray-200 px-4 py-2">Category</th>
                        <th className="border border-gray-200 px-4 py-2">Created On</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-200 px-4 py-2">{item.title}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.content}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.category}</td>
                            <td className="border border-gray-200 px-4 py-2">{moment(item.created_on).format('YYYY-MM-DD')}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
