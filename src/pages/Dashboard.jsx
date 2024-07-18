import React, { useEffect, useState } from "react";
import SalesChart from "../components/chart/SalesChart";
import PurchaseChart from "../components/chart/PurchaseChart";
import ExpenceChart from "../components/chart/ExpenceChart";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("sales");
  useEffect(() => {
    console.log(activeSection)
  }, [activeSection]);
  const renderActiveSection = () => {
    switch (activeSection) {
      case "sales":
        return <SaleOrderDashboard sales={sales} />;
      case "purchaseOrders":
        return <PurchaseDash />;
      case "expenses":
        return <ExpenseDashboard />;
      default:
        return null;
    }
  };
  return (
    <div>
      Dashboard
      <div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => {
              setActiveSection("sales");
            }}
          >
            Sales
          </button>
          <button
            onClick={() => {
              setActiveSection("purchase");
            }}
          >
            Purchase
          </button>
          <button
            onClick={() => {
              setActiveSection("expence");
            }}
          >
            Expence
          </button>
        </div>
        <div>
          {(activeSection == "sales") && (
            <div>
              <SalesChart/>
            </div>
          )}
        </div>
        <div>
          {(activeSection == "purchase") && (
            <div>
              <PurchaseChart/>
            </div>
          )}
        </div>
        <div>
          {(activeSection == "expence") && (
            <div>
              <ExpenceChart/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
