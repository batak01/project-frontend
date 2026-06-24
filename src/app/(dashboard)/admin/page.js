"use client";

import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import useAuth from "@/hooks/useAuth";
import StatsCard from "@/features/admin/components/StatsCard";
import Topbar from "@/features/admin/components/Topbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminPage() {

  const { auth } = useAuth();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    productsSold: 0,
    todayOrders: 0,
  });

  const [activities, setActivities] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    if (!auth?.accessToken) return;

    const fetchDashboard = async () => {

      try {

        const statsRes =
          await apiClient.get(
            "/api/admin/stats"
          );

        setStats(statsRes.data);

        const chartRes =
          await apiClient.get(
            "/api/admin/sales-chart"
          );

        const salesMap = {};

        chartRes.data.chart.forEach((item)=>{

          const date =
            new Date(item.saleDate)
            .toISOString()
            .split("T")[0];

          salesMap[date] =
            Number(item.revenue);

        });

        const last7Days = [];

        for(let i = 6; i >= 0; i--){

          const date = new Date();

          date.setDate(
            date.getDate() - i
          );

          const dateKey =
            date
            .toISOString()
            .split("T")[0];

          last7Days.push({

            name:
              date.toLocaleDateString(
                "en-US",
                {
                  weekday:"short"
                }
              ),

            revenue:
              salesMap[dateKey] || 0

          });

        }

        setChartData(last7Days);

        const latestOrdersRes =
          await apiClient.get(
            "/api/admin/latest-orders"
          );

        setLatestOrders(
          latestOrdersRes.data.orders
        );

        const activityRes =
          await apiClient.get(
            "/api/admin/recent-activity"
          );

        setActivities(
          activityRes.data.activities
        );

      } catch(err){

        console.log(
          "Dashboard error",
          err
        );

      }

    };

    fetchDashboard();

  },[auth?.accessToken]);



return (

<div className="space-y-8">



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

<div className="bg-white p-6 rounded-2xl shadow">


<h2 className="text-lg font-semibold mb-4">
 Sales Overview
</h2>


<div className="h-64">


<ResponsiveContainer
 width="100%"
 height="100%"
>


<LineChart data={chartData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis width={100}/>


<Tooltip/>


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



<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">



<div className="bg-white p-6 rounded-2xl shadow">


<h2 className="text-lg font-semibold mb-4">
Recent Activity
</h2>


<div className="space-y-3">


{
activities?.length > 0 ?

activities.map((activity,index)=>(


<div
key={activity.id}
className={`flex justify-between items-center pb-3 ${
index !== activities.length - 1
? "border-b"
: ""
}`}
>


<div>

<p className="font-medium text-slate-700">
{activity.email}
</p>


<p className="text-xs text-slate-400">
{activity.activity}
</p>


</div>


<span className="text-xs text-slate-400">

{
new Date(
activity.created_at
)
.toLocaleString("id-ID")
}

</span>


</div>


))

:

<p className="text-slate-400">
No activity found
</p>

}


</div>


</div>



<div className="bg-white p-6 rounded-2xl shadow">


<h2 className="text-lg font-semibold mb-4">
Latest Orders
</h2>


<div className="space-y-3">


{
latestOrders?.length > 0 ?

latestOrders.map((order,index)=>(


<div
key={order.id}
className={`flex justify-between items-center pb-3 ${
index !== latestOrders.length - 1
? "border-b"
: ""
}`}
>


<div>


<p className="font-medium text-slate-700">
{order.order_number}
</p>


<p className="text-xs text-slate-400">
{order.email}
</p>


<p className="text-xs text-emerald-600 font-medium">

Rp{" "}
{
Number(
order.total_amount
)
.toLocaleString("id-ID")
}

</p>

</div>

<span
className="px-3 py-1 text-xs rounded-full bg-slate-100"
>

{order.status}

</span>

</div>

))

:

<p className="text-slate-400">
No orders found
</p>

}

</div>

</div>

</div>

</div>

);


}