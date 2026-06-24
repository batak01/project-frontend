"use client";

import {
  useState
} from "react";

import useUsers from "@/features/users/hooks/useUsers";

import UserTable from "./UserTable";

import RequireAdmin from "@/features/admin/components/RequireAdmin";

import DeleteUserModal from "./DeleteUserModal";

import { toast } from "react-hot-toast";

export default function UsersManagement(){

  const [
    selectedUser,
    setSelectedUser
  ] = useState(null);

  const [
    showDeleteModal,
    setShowDeleteModal
  ] = useState(false);

  const {
    users,
    loading,
    pagination,
    search,
    sort,
    handleSearch,
    handleSort,
    changePage,
    removeUser,
    refreshUsers
  } = useUsers();

  const handleDelete = (user)=>{

    setSelectedUser(user);

    setShowDeleteModal(true);

  };

  return (

    <RequireAdmin>

      <div className="space-y-6">

        {/* pindahkan JSX lama di sini */}

      </div>

    </RequireAdmin>

  );

}