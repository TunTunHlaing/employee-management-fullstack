import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditEmployeeForm = ({ closeModal, employee , token}) => {
    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [email, setEmail] = useState(employee.email);
    const [message, setMessage] = useState('');
    const [currentToken, setCurrentToken] = useState(token); 
    

    useEffect(() => {
        if (employee) {
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setEmail(employee.email);
        }
    }, [employee]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedEmployee = {
            firstName,
            lastName,
            email
        };

        try {
            var response = await axios.put(`/api/employee-management/${employee.id}`, updatedEmployee, {
                headers: {
                    'Authorization' : `Bearer ${token.accessToken}`
                }
            });

            if (response.status === 401) {
                const tokenRes = await axios.post('/public/refresh', { refreshToken: currentToken.refreshToken });
                const newToken = tokenRes.data; 

                localStorage.setItem('token', JSON.stringify(newToken));
                setCurrentToken(newToken); 
             }

            setMessage('Employee Updated Successfully.');
            closeModal();
        } catch (err) {
            setMessage('Error: ' + err.message);
        }
    };

    return (
        <div className='duration-700'>
   <div className='flex justify-between'>
                <h2 className="text-center text-2xl mb-4">Edit Employee</h2>
                <button className='text-center text-2xl font-semibold align-baseline' onClick={() => {closeModal()}}>X</button>
            </div>            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex flex-col justify-center items-center mb-4'>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        placeholder='Enter First Name*' 
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="border p-2 rounded-lg w-full"
                    />
                </div>

                <div className='flex flex-col justify-center items-center mb-4'>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        placeholder='Enter Last Name*' 
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="border p-2 rounded-lg w-full"
                    />
                </div>

                <div className='flex flex-col justify-center items-center mb-4'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        placeholder='Enter Email*' 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 rounded-lg w-full"
                    />
                </div>

                <button type="submit" className='border py-3 px-4 rounded-lg text-white font-bold bg-green-500'>
                    Update Employee
                </button>
            </form>

            {message && <p className="text-center mt-4 text-lg">{message}</p>}
        </div>
    );
};

export default EditEmployeeForm;
