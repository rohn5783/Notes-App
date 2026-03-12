import axios from 'axios';
 const api = axios.create({
    // baseURL: 'https://notes-app-2-0d09.onrender.com',
    baseURL: "https://notes-app-rktm.vercel.app",

    withCredentials: true,
 })
   
 export async function login({ email, password }) {

const response = await api.post('/api/auth/login', { email, password });

localStorage.setItem("token", response.data.token);

return response.data;

}




export async function register({ userName, email, password }) {

const response = await api.post('/api/auth/register', {
  userName,
  email,
  password
});

return response.data;

}


export async function logout() {

const response = await api.post('/api/auth/logout');
return response.data;

}


export async function getUserById(id) {

const response = await api.get(`/api/auth/get/${id}`);
return response.data;

}
