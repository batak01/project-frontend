"use client";

import {
  useState
} from "react";

export default function ProductTable({
  products = [],
  loading,
  onEdit,
  onDelete
}) {

  const [search,setSearch] = useState("");

  const filteredProducts = products.filter((product)=>

    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  const formatPrice = (price)=>{

    return new Intl.NumberFormat(
      "id-ID",
      {
        style:"currency",
        currency:"IDR",
        maximumFractionDigits:0
      }
    ).format(price);

  };

return (

<div className="space-y-6">

  {/* SEARCH */}

  <div className="
    bg-white
    p-4
    rounded-2xl
    shadow
  ">

    <input

      type="text"

      placeholder="Search product..."

      value={search}

      onChange={(e)=>setSearch(e.target.value)}

      className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "

    />

  </div>

  {/* TABLE */}

  <div className="
    bg-white
    p-6
    rounded-2xl
    shadow
    overflow-x-auto
  ">

    <table className="
      w-full
      text-sm
    ">

      <thead className="
        bg-gray-100
        text-gray-600
        text-left
      ">

        <tr>

          <th className="p-4">
            Image
          </th>
          
          <th className="p-4">
            Product
          </th>

          <th className="p-4">
            Price
          </th>

          <th className="p-4">
            Stock
          </th>

          <th className="p-4">
            Status
          </th>

          <th className="
            p-4
            text-right
          ">
            Action
          </th>


        </tr>


      </thead>

      <tbody>

      {
        loading ? (

          <tr>

            <td
              colSpan={5}
              className="
                p-6
                text-center
                text-gray-400
              "
            >
              Loading products...
            </td>

          </tr>

        ) : filteredProducts.length === 0 ? (

          <tr>

            <td
              colSpan={5}
              className="
                p-6
                text-center
                text-gray-400
              "
            >
              No products found
            </td>

          </tr>

        ) : (

          filteredProducts.map((product)=>(

            <tr

              key={product.uuid}

              className="
                border-t
                hover:bg-gray-50
                transition
              "
            >

              {/* PRODUCT */}

              <td className="p-4">

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="
                    w-16
                    h-16
                    rounded-xl
                    object-cover
                    border
                  "
                />

              </td>

              <td className="p-4">

                <div className="
                  flex
                  flex-col
                  gap-1
                  min-w-[220px]
                ">


                  <p className="
                    font-semibold
                    text-slate-800
                    text-sm
                  ">

                    {product.name}

                  </p>

                  {
                    product.description &&

                    <p className="
                      text-xs
                      text-slate-500
                      line-clamp-2
                    ">

                      {product.description}

                    </p>

                  }

                </div>

              </td>

              {/* PRICE */}

              <td className="p-4">

                <span className="
                    inline-flex
                    px-3
                    py-1.5
                    rounded-xl
                    bg-blue-50
                    text-blue-700
                    text-xs
                    font-semibold
                  "
                >

                  {formatPrice(product.price)}

                </span>

              </td>

              {/* STOCK */}

              <td className="p-4">

                <p className="
                    font-semibold
                    text-slate-800
                    text-sm
                  ">

                {product.stock}

                </p>

              </td>

              {/* STATUS */}

              <td className="p-4">

                <span

                  className="
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    bg-green-100
                    text-green-700
                  "
                >

                  {product.status}

                </span>

              </td>

              {/* ACTION */}

              <td className="
                p-4
                text-right
              ">

                <div className="
                  flex
                  justify-end
                  gap-2
                ">

                  <button

                    onClick={()=>{
                      onEdit?.(product)
                    }}

                    className="
                      px-3
                      py-1.5
                      rounded-lg
                      bg-blue-500
                      text-white
                      hover:bg-blue-600
                    "
                  >

                    Edit

                  </button>

                  <button

                    onClick={()=>{
                      onDelete?.(product)
                    }}

                    className="
                      px-3
                      py-1.5
                      rounded-lg
                      bg-red-500
                      text-white
                      hover:bg-red-600
                    "
                  >

                    Delete

                  </button>

                </div>

              </td>

            </tr>

          ))

        )

      }


      </tbody>



    </table>





    {/* PAGINATION UI */}

    <div className="
      flex
      justify-center
      items-center
      gap-2
      mt-6
    ">


      <button

        className="
          px-4
          py-2
          rounded-lg
          bg-blue-500
          text-white
        "

      >

        Prev

      </button>




      <span className="font-medium">

        Page 1

      </span>




      <button

        className="
          px-4
          py-2
          rounded-lg
          bg-blue-500
          text-white
        "

      >

        Next

      </button>


    </div>

  </div>


</div>


);


}