"use client";

import StatsCard from "./StatsCard";
import Topbar from "@/components/layout/Topbar";

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

export default function AdminDashboard(){

  const {
    stats,
    activities,
    latestOrders,
    chartData
  } = useAdminDashboard();

  return (
    <div className="space-y-8">

      {/* pindahkan JSX dashboard lama di sini */}

    </div>
  );

}