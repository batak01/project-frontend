"use client";

import Topbar from "@/components/layout/Topbar";
import StatsCard from "./StatsCard";
import useAdminDashboard from "@/features/admin/hooks/useAdminDashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Dipindahkan ke luar komponen agar tidak dibuat ulang di setiap render (Lebih hemat memori)
const STATUS_STYLES = {
  completed: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  pending: "bg-orange-100 text-orange-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const { stats, activities, latestOrders, chartData } = useAdminDashboard();

  return (
    <div className="space-y-8">
      {/* Top Navigation Bar */}
      <Topbar />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Revenue"
          value={`Rp ${Number(stats.totalRevenue).toLocaleString("id-ID")}`}
          subtitle="Total sales revenue"
          icon="💰"
        />
        <StatsCard
          title="Orders"
          value={stats.totalOrders}
          subtitle="Total orders"
          icon="📦"
        />
        <StatsCard
          title="Products Sold"
          value={stats.productsSold}
          subtitle="Units sold"
          icon="🛒"
        />
        <StatsCard
          title="Today's Orders"
          value={stats.todayOrders}
          subtitle="Orders today"
          icon="📈"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis width={100} />
              <Tooltip />
              <Line
                type="linear"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid: Activity & Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {activities?.length > 0 ? (
              activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex justify-between items-center pb-3 ${
                    index !== activities.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-slate-700">{activity.email}</p>
                    <p className="text-xs text-slate-400">{activity.activity}</p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(activity.created_at).toLocaleString("id-ID")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No activity found</p>
            )}
          </div>
        </div>

        {/* Latest Orders */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Latest Orders</h2>
          <div className="space-y-3">
            {latestOrders?.length > 0 ? (
              latestOrders.map((order, index) => (
                <div
                  key={order.id}
                  className={`flex justify-between items-center pb-3 ${
                    index !== latestOrders.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-700">
                      {order.order_number}
                    </p>
                    <p className="text-xs text-slate-400">{order.email}</p>
                    <p className="text-sm text-emerald-600 font-semibold mt-1">
                      Rp {Number(order.total_amount).toLocaleString("id-ID")}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      STATUS_STYLES[order.status] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No orders found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}