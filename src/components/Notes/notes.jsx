import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Notes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Pending',
    });
    const [loading, setLoading] = useState(true);

    const getTask = async (taskId) => {
        const token = localStorage.getItem('token');
        try {
            console.log("Fetching task details for ID:", taskId);
            const response = await fetch(`https://backend-cq2x.onrender.com/task/${taskId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch task details');
            }
            const task = await response.json();
            setFormData({
                title: task.data.title,
                content: task.data.content,
                category: task.data.category || 'Pending',
            });
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            const fetchTaskDetails = async () => {
                await getTask(id);
            };
            fetchTaskDetails();
        } else {
            setLoading(false); 
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = id
                ? `https://backend-cq2x.onrender.com/task/update/${id}` 
                : `https://backend-cq2x.onrender.com/task/add`; 
            const method = id ? 'PUT' : 'POST'; 

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(id ? 'Failed to update task' : 'Failed to create task');
            }

            navigate('/'); 
        } catch (err) {
            console.error(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Complete">Complete</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {id ? 'Update Task' : 'Create Task'}
                </button>
            </form>
        </div>
    );
};

export default Notes;
