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
    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
      <p className="text-slate-500 mt-1">
        Manage registered users in the system
      </p>
    </div>

    {/* Summary Stat */}
    <div className="bg-white p-5 rounded-2xl shadow">
      <p className="text-sm text-gray-500">Total Users</p>
      <h2 className="text-3xl font-bold mt-2">{pagination.total}</h2>
    </div>

    {/* Data Table */}
    <UserTable
      users={users}
      loading={loading}
      onDelete={handleDelete}
      search={search}
      handleSearch={handleSearch}
      pagination={pagination}
      changePage={changePage}
      sort={sort}
      handleSort={handleSort}
    />

    {/* Modals */}
    <DeleteUserModal
      open={showDeleteModal}
      user={selectedUser}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={async () => {
        try {
          await removeUser(selectedUser.uuid);
          setShowDeleteModal(false);
          setSelectedUser(null);
          await refreshUsers();
          toast.success("User deleted successfully");
        } catch (error) {
          console.error(error);
          toast.error(
            error.response?.data?.message || "Failed to delete user"
          );
        }
      }}
    />
  </div>
</RequireAdmin>

  );

}