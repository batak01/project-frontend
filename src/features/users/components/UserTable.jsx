"use client";


import {
useState
} from "react";


export default function UserTable({

users=[],

loading,

onDelete,

search,

handleSearch,

pagination,

changePage,

sort,

handleSort

}){



return (


      <div className="space-y-6">

        <div className="bg-white p-4 rounded-2xl shadow">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e)=>{

              handleSearch(
                e.target.value
              );

            }}
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

        <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-left">
                <tr>
                  <th

                  onClick={()=>handleSort("email")}

                  className="
                  p-4
                  cursor-pointer
                  select-none
                  "

                  >
                  Email

                  {
                  sort.sortBy === "email"
                  ?
                  (
                    sort.order === "asc"
                    ?
                    " ▲"
                    :
                    " ▼"
                  )
                  :
                  null
                  }

                  </th>

                  <th

                  onClick={()=>handleSort("role")}

                  className="
                  p-4
                  cursor-pointer
                  select-none
                  "

                  >
                  Role

                  {
                  sort.sortBy === "role"
                  ?
                  (
                  sort.order === "asc"
                  ?
                  " ▲"
                  :
                  " ▼"
                  )
                  :
                  null
                  }

                  </th>

                  <th

                  onClick={()=>handleSort("created_at")}

                  className="
                  p-4
                  cursor-pointer
                  select-none
                  "

                  >
                  Created

                  {
                  sort.sortBy === "created_at"
                  ?
                  (
                  sort.order === "asc"
                  ?
                  " ▲"
                  :
                  " ▼"
                  )
                  :
                  null
                  }

                  </th>

                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-400">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.uuid} className="border-t hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                            {user.email?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div>
                            <p className="font-medium text-slate-800">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                          {new Date(user.created_at).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </td>
                      <td className="p-4 text-right">

                        <button

                          onClick={()=>{
                            
                            onDelete(user);

                          }}

                          className="
                            px-4
                            py-2
                            rounded-lg
                            bg-red-500
                            text-white
                            text-sm
                            font-medium
                            hover:bg-red-600
                            transition
                          "

                        >

                          Delete

                        </button>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="flex justify-center items-center gap-3 mt-6">

                {/* PREV BUTTON */}
                <button
                  disabled={
                    pagination.page === 1
                  }
                  onClick={()=>{

                    changePage(
                      pagination.page - 1
                    );

                  }}
                  className={`
                    px-4
                    py-2
                    rounded-lg
                    font-medium
                    transition

                    ${
                      pagination.page === 1
                      ?
                      `
                      bg-white
                      text-gray-400
                      border
                      border-gray-200
                      cursor-not-allowed
                      `
                      :
                      `
                      bg-blue-500
                      text-white
                      hover:bg-blue-600
                      cursor-pointer
                      `
                    }
                  `}
                >
                  Prev
                </button>



                {/* PAGE INFO */}
                <span
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-slate-100
                    text-slate-700
                    font-medium
                  "
                >
                  Page {pagination.page} of {pagination.totalPages}
                </span>



                {/* NEXT BUTTON */}
                <button
                  disabled={
                    pagination.page >= pagination.totalPages
                  }
                  onClick={()=>{

                    changePage(
                      pagination.page + 1
                    );

                  }}
                  className={`
                    px-4
                    py-2
                    rounded-lg
                    font-medium
                    transition

                    ${
                      pagination.page >= pagination.totalPages
                      ?
                      `
                      bg-white
                      text-gray-400
                      border
                      border-gray-200
                      cursor-not-allowed
                      `
                      :
                      `
                      bg-blue-500
                      text-white
                      hover:bg-blue-600
                      cursor-pointer
                      `
                    }
                  `}
                >
                  Next
                </button>

              </div>
          </div>

      </div>

);


}