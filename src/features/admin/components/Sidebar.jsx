"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiClient from "@/services/apiClient";
import useAuth from '@/hooks/useAuth';

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
  try {
    await apiClient.post('/api/auth/logout');

    logout(); // lebih jelas daripada {}
    router.replace('/login'); // replace biar tidak bisa back ke admin
  } catch (err) {
    console.log("Logout error:", err);

    // tetap paksa logout di frontend biar tidak nyangkut
    logout();
    router.replace('/login');
  }
};

  return (
    <aside className="w-72 bg-slate-900 text-white p-6 hidden md:flex flex-col">
      <div>
        <h1 className="text-3xl font-bold">AdminPanel</h1>
      </div>

      <nav className="mt-10 space-y-3">

        <Link
          href="/admin"
          className="block px-4 py-3 rounded-2xl bg-blue-600"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/users"
          className="block px-4 py-3 rounded-2xl hover:bg-slate-800"
        >
          Users
        </Link>

        <Link
          href="/admin/products"
          className="block px-4 py-3 rounded-2xl hover:bg-slate-800"
        >
          Products
        </Link>

      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-400 rounded-xl py-3"
      >
        Logout
      </button>
    </aside>
  );
}