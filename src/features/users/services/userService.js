"use client";

import apiClient from "@/services/apiClient";

export const getUsers = async({

  page = 1,

  limit = 10,

  search = "",

  sortBy = "created_at",

  order = "desc"

} = {})=>{

  const response =
    await apiClient.get(
      "/api/admin/users",
      {
        params:{

          page,

          limit,

          search,

          sortBy,

          order

        }
      }
    );

  return response.data;

};

export const deleteUser = async(uuid)=>{

  const response =
    await apiClient.delete(
      `/api/admin/users/${uuid}`
    );

  return response.data;

};