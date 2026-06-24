"use client";

import {
  useEffect,
  useState
} from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

export default function useProducts(){

  const [products,setProducts] = useState([]);

  const [loading,setLoading] = useState(true);

  const [actionLoading,setActionLoading] = useState(false);

  const [error,setError] = useState(null);


  const fetchProducts = async()=>{

    try{

      setError(null);

      const data =
        await getProducts();

      setProducts(data);

    }catch(err){

      console.error(
        "Failed load products",
        err
      );

      setError(err);

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    fetchProducts();

  },[]);

  const addProduct = async(data)=>{

    try{

      setActionLoading(true);

      await createProduct(data);

      await fetchProducts();

    }catch(err){

      console.error(
        "Create product failed",
        err
      );

      throw err;

    }finally{

      setActionLoading(false);

    }

  };

  const editProduct = async(
    uuid,
    data
  )=>{

    try{

      setActionLoading(true);

      await updateProduct(
        uuid,
        data
      );

      await fetchProducts();

    }catch(err){

      console.error(
        "Update product failed",
        err
      );

      throw err;

    }finally{

      setActionLoading(false);

    }

  };

  const removeProduct = async(uuid)=>{

    try{

      setActionLoading(true);

      await deleteProduct(uuid);

      await fetchProducts();

    }catch(err){

      console.error(
        "Delete product failed",
        err
      );

      throw err;

    }finally{

      setActionLoading(false);

    }

  };

  return {

    products,

    loading,

    actionLoading,

    error,

    fetchProducts,

    addProduct,

    editProduct,

    removeProduct

  };

}