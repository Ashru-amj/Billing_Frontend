
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";
import { label } from "../utils/state";


const UtilityPage = () => {

  const allSales = useSelector((state) => state.sales).sales;
  const allExpence = useSelector((state) => state.expence).expence;
  const allPurchase = useSelector((state) => state.transaction).transaction;
  const [saleAmount, setSaleAmount] = useState(0);
  const [expenceAmount, setExpenceAmount] = useState(0);
  const [monthSales, setMonthSales] = useState([]);
  const [monthExpence, setMonthExpence] = useState([]);

  const saleFun = () => {
    const monthlyTotal = [];

    allSales.forEach((transaction) => {
      const month = Number(transaction.date.split("-")[1]);
      if (!monthlyTotal[month]) {
        monthlyTotal[month] = Number(transaction.totalAmount);
      } else {
        monthlyTotal[month] += Number(transaction.totalAmount);
      }
    });
    let arr = [];
    for (let i = 0; i < 12; i++) {
      if (monthlyTotal[i + 1]) {
        arr[i] = monthlyTotal[i + 1];
      } else {
        arr[i] = 0;
      }
    }

    setMonthSales(arr);
  };
  const expenceFun = () => {
    const monthlyTotal = [];

    allExpence.forEach((transaction) => {
      const month = Number(transaction.date.split("/")[0]);
      if (!monthlyTotal[month]) {
        monthlyTotal[month] = Number(transaction.totalAmount);
      } else {
        monthlyTotal[month] += Number(transaction.totalAmount);
      }
    });
    let arr = [];
    for (let i = 0; i < 12; i++) {
      if (monthlyTotal[i + 1]) {
        arr[i] = monthlyTotal[i + 1];
      } else {
        arr[i] = 0;
      }
    }

    setMonthExpence(arr);
  };

  useEffect(() => {
    let totalSales = 0;
    allSales.forEach((element) => {
      const totalAmount = Number(element.totalAmount);
      totalSales += totalAmount;
    });
    setSaleAmount(totalSales);
    let totalExpence = 0;
    allExpence.forEach((element) => {
      const totalAmount = Number(element.totalAmount);
      totalExpence += totalAmount;
    });
    setExpenceAmount(totalExpence);
    saleFun();
    expenceFun();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2   gap-4">
          <StatCard
            title="Total Sale"
            amount={saleAmount}
            monthData={monthSales}
          />
          <StatCard
            title="Total Expenses"
            amount={expenceAmount}
            monthData={monthExpence}
          />
          <Card title="You'll Receive" amount="₹ 3,70,874.00" />
          <Card title="You'll Pay" amount="₹ 1,62,497.00" />
          <Card title="Purchase" amount="₹ 00.00" />
        </div>
        {/* <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title="Stock Inventory" amount="₹ 51,39,903.90" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Cash In Hand" amount="₹ 10,53,189.00" />
            <Card title="Bank Accounts" amount="₹ 00.00" />
            <Card title="Loan Accounts" amount="₹ 00.00" />
          </div>
        </div> */}
      </div>
    </div>
  );
}

function Card({ title, amount }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">{amount}</p>
    </div>
  );
}

function StatCard({ title, amount, monthData }) {
  const data = {
    labels: label,
    datasets: [
      {
        label: "Sales",
        data: [...monthData],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-2xl">{amount}</p>
        </div>
        <div>
          <div className="bg-green-100 p-1 rounded">
            <p className="text-green-600 text-sm">+0%</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-600 text-sm">This Month Growth</p>
        <div className="h-24 bg-gray-200 rounded mt-2">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
}

export default UtilityPage;
