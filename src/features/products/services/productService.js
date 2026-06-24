import apiClient from "@/services/apiClient";

export const getProducts = async () => {

  const response =
    await apiClient.get("/api/products");

  return response.data.products;

};

export const uploadProductImage = async (file) => {

  const formData = new FormData();

  formData.append(
    "image",
    file
  );


  const response =
    await apiClient.post(
      "/api/upload/image",
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    );


  return response.data;

};

export const createProduct = async (payload) => {

  const response =
    await apiClient.post(
      "/api/products",
      payload
    );

  return response.data;

};

export const updateProduct = async (
 uuid,
 payload
)=>{

 const response =
  await apiClient.put(
    `/api/products/${uuid}`,
    payload
  );

 return response.data;

};

export const deleteProduct = async(uuid)=>{

 const response =
 await apiClient.delete(
  `/api/products/${uuid}`
 );

 return response.data;

};