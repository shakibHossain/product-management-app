"use client";

import { CheckCircle, Package, Tag } from "lucide-react";
import StatCard from "./StatCard";
import CardPopularProducts from "./CardPopularProducts";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Total Customers",
            amount: "175",
          },
          {
            title: "Total Expenses",
            amount: "$5,000",
          },
        ]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Total Dues",
            amount: "$2000",
          },
          {
            title: "Pending Orders",
            amount: "85",
          },
        ]}
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Total Sales",
            amount: "$8000",
          },
          {
            title: "Total Discount",
            amount: "$1200",
          },
        ]}
      />
      <CardPopularProducts />
    </div>
  );
};

export default Dashboard;
