import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({setIsAuthenticated}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if (!email || !password) {
            setMessage('Please enter both email and password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/public/login', { email, password });
            setIsLoading(false);

            localStorage.setItem('token', JSON.stringify(response.data))
            setIsAuthenticated(true)
            navigate('/home');
           
        } catch (error) {
            setIsLoading(false);
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-center text-3xl font-semibold text-gray-700 mb-6">Login</h2>
                
                {message && <p className="text-center text-red-500 mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">email</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full py-2 rounded-lg text-white font-bold ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
