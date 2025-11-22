import axios from "axios"

const refreshToken = async ({response, token}) => {
    if (response.status === 401) {
          const tokenRes = await axios.post('/public/refresh', { refreshToken: token.refreshToken });
          const newToken = tokenRes.data; 
          localStorage.setItem('token', JSON.stringify(newToken));
        }
}

const createEmployee = ({employee, token, setError}) => {
   try{
    const create = async () => {
        const response = axios.post('/api/employee-management', employee,
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                }
        }
        );
        refreshToken({response, token})
    }
    create()

   }catch(err) {
    setError(err.message)
   }
}


const updateEmployee = ({employee, token, setError}) => {
   try{
    const update = async () => {
        const response =  axios.put(`/api/employee-management/${employee.id}`, employee,
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                }
        }
        );
        refreshToken({response, token})
    }
    update()

   }catch(err) {
    setError(err.message)
   }
}

const deleteEmployee = ({id, token, setError}) => {
   try{
    const deleteEmployeeApi = async () => {
            const response = await axios.delete(`/api/employee-management/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                }
        }
        );
        refreshToken({response, token})
    }
    deleteEmployeeApi()

   }catch(err) {
    setError(err.message)
   }
} 

const employeeReduer = ({state, action}) => {
    switch(action.create) {
        case 'CREATE': {
            return createEmployee(
                    action.payload,
                    action.token,
                    action.setError
            )
        }
        case 'UPDATE': {
            return updateEmployee(
                    action.payload,
                    action.token,
                    action.setError
            )
        }

        case 'DELETE': {
            return deleteEmployee(
                action.id,
                action.token,
                action.setError
            )
        }

        default: throw new Error('Not A Valid Operation!')
    }
}