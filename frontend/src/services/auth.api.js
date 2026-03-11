import { api } from "./api.client";
   
 export async function login({ email, password }) {

const response = await api.post('/api/notes/login', { email, password });
return response.data;

}




export async function register({ userName, email, password }) {

const response = await api.post('/api/notes/register', {
  userName,
  email,
  password
});

return response.data;

}

export async function me() {
  const response = await api.get("/api/notes/me");
  return response.data;
}


export async function logout() {

const response = await api.post('/api/notes/logout');
return response.data;

}


export async function getUserById(id) {

const response = await api.get(`/api/notes/get/${id}`);
return response.data;

}
