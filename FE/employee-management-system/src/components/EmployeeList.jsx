import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from './Modal'; 
import CreateEmployeeForm from './CreateEmployeeForm';
import EditEmployeeForm from "./EditEmployeeForm"; 
import { MdDelete } from "react-icons/md";
import DeleteConfirmationBox from './DeleteConfirmationBox';

const EmployeeList = ({ token }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [oldEmployee, setOldEmployee] = useState({});
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [currentToken, setCurrentToken] = useState(token); 

  const handleDeleteEmployee = (employee) => {
    setOldEmployee(employee);
    setIsDeleteModelOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setOldEmployee(employee);
    setIsEditModelOpen(true);
  };

  useEffect(() => {
    if (!currentToken || !currentToken.accessToken) {
      setError("No token available");
      setIsLoading(false);
      return;
    }

    const fetchEmployee = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/employee-management', {
          headers: {
            Authorization: `Bearer ${currentToken.accessToken}`
          }
        });

        if (response.status === 401) {
          const tokenRes = await axios.post('/public/refresh', { refreshToken: currentToken.refreshToken });
          const newToken = tokenRes.data; 

          localStorage.setItem('token', JSON.stringify(newToken));
          setCurrentToken(newToken); 
        } else {
          setEmployees(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [currentToken, isModalOpen, isEditModelOpen, isDeleteModelOpen]);

  return (
    <div className="h-screen w-full p-6">
      {isLoading && (
        <h2 className="text-center text-3xl font-semibold text-gray-700">
          <AiOutlineLoading3Quarters className="text-center" />
        </h2>
      )}
      {error && (
        <h2 className="text-center text-3xl font-semibold text-red-500">{error}</h2>
      )}

      {!isLoading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg h-full">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-white uppercase bg-gradient-to-r from-teal-500 to-blue-500">
              <tr>
                <th className="px-6 py-3 text-center">Id</th>
                <th className="px-6 py-3 text-center">First Name</th>
                <th className="px-6 py-3 text-center">Last Name</th>
                <th className="px-6 py-3 text-center">Email</th>
                <th className="px-6 py-3 text-center"></th>
                <th className="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody className="h-full overflow-auto">
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-sky-100 hover:shadow-lg">
                  <td className="px-6 py-4 text-center">{employee.id}</td>
                  <td className="px-6 py-4 text-center">{employee.firstName}</td>
                  <td className="px-6 py-4 text-center">{employee.lastName}</td>
                  <td className="px-6 py-4 text-center">{employee.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-3xl" onClick={() => handleEditEmployee(employee)}>
                      <MdOutlineModeEditOutline />
                    </button>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button className="text-3xl" onClick={() => handleDeleteEmployee(employee)}>
                      <MdDelete className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full">
            <div className="flex justify-end mt-3 w-full ">
              <button 
                className="border py-3 px-4 rounded-lg text-white font-bold bg-sky-500 mr-3" 
                onClick={() => setIsModalOpen(true)} 
              >
                Create Employee
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <CreateEmployeeForm closeModal={() => setIsModalOpen(false)} token={currentToken}/>
      </Modal>

      <Modal isOpen={isEditModelOpen} closeModal={() => setIsEditModelOpen(false)}>
        <EditEmployeeForm token={currentToken} closeModal={() => setIsEditModelOpen(false)} employee={oldEmployee} />
      </Modal>

      <Modal isOpen={isDeleteModelOpen} closeModal={() => setIsDeleteModelOpen(false)}>
        <DeleteConfirmationBox closeModal={() => setIsDeleteModelOpen(false)} token={currentToken} id={oldEmployee.id} />
      </Modal>
    </div>
  );
};

export default EmployeeList;
