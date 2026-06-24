"use client";

import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import useAuth from "@/features/auth/hooks/useAuth";

export default function useAdminDashboard(){

  const { auth } = useAuth();

  const [stats,setStats] = useState({
    totalRevenue:0,
    totalOrders:0,
    productsSold:0,
    todayOrders:0,
  });

  const [activities,setActivities] = useState([]);

  const [latestOrders,setLatestOrders] = useState([]);

  const [chartData,setChartData] = useState([]);

  useEffect(()=>{

    if(!auth?.accessToken) return;

    async function fetchDashboard(){

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

        chartRes.data.chart.forEach(item=>{

          const date =
            new Date(item.saleDate)
            .toISOString()
            .split("T")[0];

          salesMap[date] =
            Number(item.revenue);

        });

        const last7Days=[];

        for(let i=6;i>=0;i--){

          const date=new Date();

          date.setDate(
            date.getDate()-i
          );

          const dateKey =
            date.toISOString()
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

    }

    fetchDashboard();

  },[auth?.accessToken]);

  return {
    stats,
    activities,
    latestOrders,
    chartData
  };

}