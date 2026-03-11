import axios from 'axios';
 const api = axios.create({
    baseURL: 'https://notes-app-1-31wh.onrender.com/',
    withCredentials: true,
 })
   
 export async function login({ email, password }) {

const response = await api.post('api/notes/login', { email, password });
return response.data;

}




export async function register({ userName, email, password }) {

const response = await api.post('api/notes/register', {
  userName,
  email,
  password
});

return response.data;

}


export async function logout() {

const response = await api.post('api/notes/logout');
return response.data;

}


export async function getUserById(id) {

const response = await api.get(`api/notes/get/${id}`);
return response.data;

}
