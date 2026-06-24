import axios from "axios";

console.log(
  "API URL:",
  process.env.NEXT_PUBLIC_API_URL
);

const apiClient = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL,

  withCredentials:true,

});

apiClient.interceptors.request.use(

(config)=>{

  const auth =
    JSON.parse(
      localStorage.getItem("auth") || "{}"
    );

  if(auth?.accessToken){

    config.headers.Authorization =
      `Bearer ${auth.accessToken}`;

  }

  return config;

},

(error)=>
Promise.reject(error)

);

apiClient.interceptors.response.use(

(response)=>response,

async(error)=>{

const originalRequest =
 error.config || {};

if(
 originalRequest.url?.includes("/api/auth/token")
){

 return Promise.reject(error);

}

if(
 error.response?.status === 401 &&
 !originalRequest._retry
){

 originalRequest._retry = true;

 try{

 const auth =
  JSON.parse(
   localStorage.getItem("auth") || "{}"
  );

 if(!auth?.refreshToken){

   localStorage.removeItem("auth");

   window.location.href="/login";

   return Promise.reject(error);

 }

 const response =
 await axios.post(

 `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`,

 {
  refreshToken:
   auth.refreshToken
 }

 );

 const updatedAuth={

  ...auth,

  accessToken:
   response.data.accessToken,

  refreshToken:
   response.data.refreshToken

 };

 localStorage.setItem(
  "auth",
  JSON.stringify(updatedAuth)
 );

 originalRequest.headers =
  originalRequest.headers || {};

 originalRequest.headers.Authorization =
 `Bearer ${updatedAuth.accessToken}`;

 return apiClient(originalRequest);

 }catch(err){

 localStorage.removeItem("auth");

 window.location.href="/login";

 return Promise.reject(err);

 }

}

return Promise.reject(error);

}

);

export default apiClient;