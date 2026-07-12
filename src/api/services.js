import axios from "axios";


const api = axios.create({
    baseURL : "http://localhost:3000",
});
api.interceptors.request.use((config) => {
        console.log("REquest Sent")
        console.log(config.method,"\nconfig:",config)

        return config
},
(error) => {
    return Promise.reject(error);
  }
)

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