import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/userAuth";



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

    const router = useRouter()
const userStore  = useAuthStore() 
       
    if (error.response.status === 404 && error.response.data.message === "Invalid token"){
        userStore.logout()
        router.push('/')

    }


    return Promise.reject(error);
  });


export default api;