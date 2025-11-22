// DeleteConfirmationBox.jsx

import React, { useState } from 'react';
import axios from "axios";

const DeleteConfirmationBox = ({ closeModal, id , token}) => {
    const [message, setMessage] = useState('');
    const [currentToken, setCurrentToken] = useState(token); 

    const handleDeleteEmployee = async () => {
        try {
            const response = await axios.delete(`/api/employee-management/${id}`,
               { headers: {
            Authorization: `Bearer ${token.accessToken}`,
             }
            }
            );

            if (response.status === 401) {
                const tokenRes = await axios.post('/public/refresh', { refreshToken: currentToken.refreshToken });
                const newToken = tokenRes.data; 

                localStorage.setItem('token', JSON.stringify(newToken));
                setCurrentToken(newToken); 
             }

            closeModal();
            setMessage(`Deleted Employee With Id ${id}`);
        } catch (err) {
            setMessage('Error: ' + err.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center rounded-lg shadow-lg p-6 w-96 mx-auto">
            <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">Are you sure you want to delete this employee?</h1>

            <div className="flex justify-around w-full mt-6">
                <button 
                    onClick={closeModal} 
                    className="border border-gray-300 text-lg text-gray-600 rounded-lg py-2 px-4 hover:bg-gray-200 transition-colors"
                >
                    No
                </button>
                <button 
                    onClick={handleDeleteEmployee} 
                    className="border border-red-600 text-lg text-white bg-red-500 rounded-lg py-2 px-4 hover:bg-red-600 transition-colors"
                >
                    Yes
                </button>
            </div>

            {message && <p className="text-center mt-4 text-lg text-gray-700">{message}</p>}
        </div>
    );

};

export default DeleteConfirmationBox;
