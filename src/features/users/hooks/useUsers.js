"use client";

import {
  useEffect,
  useState
} from "react";

import {
  getUsers,
  deleteUser
} from "../services/userService";

export default function useUsers(){

  const [users,setUsers] = useState([]);

  const [loading,setLoading] = useState(true);

  const [pagination,setPagination] = useState({
    page:1,
    limit:10,
    total:0,
    totalPages:0
  });

  const [search,setSearch] = useState("");

  const [sort,setSort] = useState({

  sortBy:"created_at",

  order:"desc"

});

  const fetchUsers = async()=>{

    try{

      setLoading(true);

      const data = await getUsers({

        page: pagination.page,

        limit: pagination.limit,

        search,

        sortBy:sort.sortBy,

        order:sort.order

      });

      setUsers(
        data.users
      );

      setPagination({

        page:data.pagination.page,

        limit:data.pagination.limit,

        total:data.pagination.totalUsers,

        totalPages:data.pagination.totalPages

      });

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  };

  const handleSort = (field)=>{

  setSort(prev=>({

    sortBy:field,

    order:
      prev.sortBy === field &&
      prev.order === "desc"
      ?
      "asc"
      :
      "desc"

  }));

};

  useEffect(()=>{

  const delay = setTimeout(()=>{

    fetchUsers();

  },400);

  return ()=>clearTimeout(delay);

  },[
    pagination.page,
    pagination.limit,
    search,
    sort.sortBy,
    sort.order
  ]);

  const changePage = (page)=>{

    setPagination(prev=>({

      ...prev,

      page

    }));

  };

  const handleSearch = (value)=>{

    setSearch(value);

    setPagination(prev=>({

      ...prev,

      page:1

    }));

  };

  const removeUser = async(uuid)=>{

    await deleteUser(uuid);

  };

  return {

    users,

    loading,

    pagination,

    search,

    sort,

    handleSearch,

    handleSort,

    changePage,

    removeUser,

    refreshUsers:fetchUsers

  };

}