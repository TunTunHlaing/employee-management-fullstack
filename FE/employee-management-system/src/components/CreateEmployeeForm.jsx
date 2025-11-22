import axios from 'axios'
import React, { useState } from 'react'

const CreateEmployeeForm = ({ closeModal, token }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [currentToken, setCurrentToken] = useState(token); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employee = {
            firstName,
            lastName,
            email
        };

        try {
           const response = await axios.post('/api/employee-management', employee,
                {
         headers: {
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
        setMessage('Employee Created Successfully.');
        closeModal();
        } catch (err) {
            setMessage('Error: ' + err.message);
        }
    }

    return (
        <div className='duration-700'>
            <div className='flex justify-between'>
                <h2 className="text-center text-2xl mb-4">Create New Employee</h2>
                <button className='text-center text-2xl font-semibold align-baseline' onClick={() => {closeModal()}}>X</button>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex flex-col justify-center items-center mb-4'>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        placeholder='Enter First Name*' 
                        onChange={(e) => { setFirstName(e.target.value) }}
                        required
                        className="border p-2 rounded-lg w-full"
                    />
                </div>

                <div className='flex flex-col justify-center items-center mb-4'>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        placeholder='Enter Last Name*' 
                        onChange={(e) => { setLastName(e.target.value) }}
                        required
                        className="border p-2 rounded-lg w-full"
                    />
                </div>

                <div className='flex flex-col justify-center items-center mb-4'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        placeholder='Enter Email*' 
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                        className="border p-2 rounded-lg w-full"
                    />
                </div>

                <button type="submit" className='border py-3 px-4 rounded-lg text-white font-bold bg-green-500'>
                    Create Employee
                </button>
            </form>

            {message && <p className="text-center mt-4 text-lg">{message}</p>}
        </div>
    )
}

export default CreateEmployeeForm
