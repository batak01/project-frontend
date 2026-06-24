"use client";

import { useState } from "react";

import useProducts from "@/features/products/hooks/useProducts";

import ProductTable from "./ProductTable";

import ProductModal from "./ProductModal";

import DeleteModal from "@/features/admin/components/DeleteModal";

export default function ProductsManagement(){

  const [open,setOpen] = useState(false);

  const [mode,setMode] = useState("create");

  const [selectedProduct,setSelectedProduct] = useState(null);

  const [deleteTarget,setDeleteTarget] = useState(null);

  const {
    products,
    loading,
    addProduct,
    editProduct,
    removeProduct
  } = useProducts();

  const handleCreate = ()=>{

  setMode("create");

  setSelectedProduct(null);

  setOpen(true);

};

const handleEdit = (product)=>{

  setMode("edit");

  setSelectedProduct(product);

  setOpen(true);

};

const handleSubmit = async(data)=>{

  try{

    if(mode==="edit"){

      await editProduct(
        selectedProduct.uuid,
        data
      );

    }else{

      await addProduct(data);

    }

    setOpen(false);

    setSelectedProduct(null);

  }catch(error){

    console.error(
      "Submit product failed",
      error
    );

  }

};

const closeModal = ()=>{

  setOpen(false);

  setSelectedProduct(null);

  setMode("create");

};

const handleDelete = (product)=>{

  setDeleteTarget(product);

};

const handleConfirmDelete = async()=>{

  await removeProduct(
    deleteTarget.uuid
  );

  setDeleteTarget(null);

};

  // pindahkan handler lama di sini
  return (

    <div
    className="
      space-y-6
    "
  >

    {/* HEADER */}

    <div
      className="
        flex
        justify-between
        items-center
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-slate-800
          "
        >
          Product Management
        </h1>

        <p
          className="
            text-slate-500
            mt-1
          "
        >
          Manage products in the system
        </p>

      </div>

      <button

        onClick={handleCreate}

        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-xl
        "

      >

        + Add Product

      </button>

    </div>

    {/* TOTAL CARD */}

    <div
      className="
        bg-white
        p-5
        rounded-2xl
        shadow
      "
    >

      <p
        className="
          text-sm
          text-gray-500
        "
      >
        Total Products
      </p>

      <h2
        className="
          text-3xl
          font-bold
          mt-2
        "
      >

        {products.length}

      </h2>

    </div>

    {/* TABLE */}

    {
      loading ? (

        <div
          className="
            bg-white
            p-6
            rounded-2xl
            shadow
            text-center
            text-gray-400
          "
        >
          Loading products...

        </div>

      ) : (

        <ProductTable

          products={products}

          onEdit={handleEdit}

          onDelete={handleDelete}

        />

      )

    }

    {/* MODAL CREATE EDIT */}

    <ProductModal

      isOpen={open}

      onClose={closeModal}

      onSubmit={handleSubmit}

      mode={mode}

      product={selectedProduct}

    />

    {/* DELETE */}

    <DeleteModal

      isOpen={!!deleteTarget}

      title="Delete Product"

      message={
        `Are you sure you want to delete ${deleteTarget?.name}?`
      }

      onClose={() => setDeleteTarget(null)}

      onConfirm={handleConfirmDelete}

    />

  </div>

  );

}