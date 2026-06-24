"use client";

import {
  useState,
  useEffect
} from "react";

import { toast } from "react-hot-toast";

import {
  uploadProductImage
} from "../services/productService";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  product = null
}){

  const [form,setForm] = useState({

  name:"",
  description:"",
  price:"",
  stock:"",
  image_url:""

});

  const [loading,setLoading] = useState(false);

  const [imageFile,setImageFile] = useState(null);

  const [preview,setPreview] = useState(null);

  const resetForm = ()=>{

  setForm({

    name:"",
    description:"",
    price:"",
    stock:"",
    image_url:""

  });

  setImageFile(null);

  setPreview(null);

};

  const fillForm = (product)=>{

  setForm({

    name: product.name || "",

    description: product.description || "",

    price: product.price || "",

    stock: product.stock || "",

    image_url: product.image_url || ""

  });

  setPreview(
    product.image_url || null
  );

};

  useEffect(()=>{

    if(
      isOpen &&
      mode === "edit" &&
      product
    ){

      fillForm(product);

    }

    if(
      isOpen &&
      mode === "create"
    ){

      resetForm();

    }

  },[
    isOpen,
    mode,
    product
  ]);

  if(!isOpen){
    return null;
  }

  const handleChange = (e)=>{

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleImageChange = (e)=>{

  const file = e.target.files[0];

  if(file){

    setImageFile(file);

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);

  }

};

  const handleSubmit = async(e)=>{

  e.preventDefault();

  try{

  setLoading(true);

  let payload = {
    ...form
  };

  if(imageFile){

    const uploadResponse =
      await uploadProductImage(imageFile);

    payload.image_url =
      uploadResponse.image_url;

  }

  await onSubmit(payload);

  toast.success(
    mode === "edit"
    ?
    "Product updated successfully"
    :
    "Product created successfully"
  );

    resetForm();

    onClose();

  }catch(error){

    toast.error(
    mode === "edit"
    ?
    "Failed update product"
    :
    "Failed create product"
    );

  }finally{

    setLoading(false);

  }

};

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-900/50
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-full
          max-w-xl
          rounded-3xl
          bg-white
          shadow-2xl
          border
          border-slate-200
          p-8
        "
      >

        {/* Header */}

        <div className="mb-6">

          <h2
          className="
              text-2xl
              font-bold
              text-slate-800
            "
          >
            {
              mode === "edit"
              ?
              "Edit Product"
              :
              "Add New Product"
            }
          </h2>

          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >
            {
              mode === "edit"
              ?
              "Update your product information"
              :
              "Create a new product for your inventory"
            }
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-2
              "
            >
              Product Name
            </label>

            <input

              name="name"

              value={form.name || ""}

              onChange={handleChange}

              placeholder="Example: iPhone 17 Pro"

              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                text-slate-800
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />

          </div>

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-2
              "
            >
              Description
            </label>

            <textarea

              name="description"

              value={form.description || ""}

              onChange={handleChange}

              placeholder="Product description"

              rows="3"

              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                text-slate-800
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />

          </div>

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-2
              "
            >
              Image
            </label>

            <input

              type="file"

              accept="image/*"

              onChange={handleImageChange}

              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                text-slate-800
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            {
                preview && (

                  <img

                    src={preview}

                    alt="Product Preview"

                    className="
                      mt-3
                      h-32
                      w-32
                      rounded-xl
                      object-cover
                      border
                    "
                  />

                )
              }

          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >

            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                "
              >
                Price
              </label>

              <input

                name="price"

                type="number"

                value={form.price || ""}

                onChange={handleChange}

                placeholder="2500000"

                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-slate-800
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

              />

            </div>

            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                "
              >
                Stock
              </label>

              <input

                name="stock"

                type="number"

                value={form.stock || ""}

                onChange={handleChange}

                placeholder="10"

                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-slate-800
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

              />

            </div>

          </div>

          <div
            className="
              flex
              justify-end
              gap-3
              pt-5
            "
          >

            <button

                type="button"

                onClick={()=>{

                if(loading) return;

                resetForm();

                onClose();

                }}

                className="
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    text-slate-700
                    font-medium
                    hover:bg-slate-100
                    hover:border-slate-400
                    transition
                    duration-200
                "

                >
                Cancel
            </button>

            <button

                type="submit"

                disabled={loading}

                className="
                px-5
                py-3
                rounded-xl
                bg-blue-600
                text-white
                hover:bg-blue-700
                transition
                shadow-lg
                shadow-blue-500/30
                disabled:opacity-50
                "

                >
                {
                  loading
                  ?
                  mode === "edit"
                  ?
                  "Updating..."
                  :
                  "Creating..."
                  :
                  mode === "edit"
                  ?
                  "Update Product"
                  :
                  "Save Product"
                }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}