import axios from "axios";


const api = axios.create({
    baseURL : "http://localhost:3333",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response) => {
    return response;
  },
  (error) => {
       
    if (error.response.status === 404){
        console.log("Not Found");
    }
    

    return Promise.reject(error);
  });


export default api;