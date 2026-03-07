import axios from 'axios';
 const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
 })
   
 export async function login({ email, password }) {

const response = await api.post('/api/notes/login', { email, password });
return response.data;

}



 export async function register({ email, password }) {

const response = await api.post('/api/notes/register', { email, password });
return response.data;

}

export async function logout() {

const response = await api.post('/api/notes/logout');
return response.data;

}

