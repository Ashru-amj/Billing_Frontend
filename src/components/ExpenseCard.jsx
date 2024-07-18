import React from 'react';
import { TfiWallet } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

const ExpenseCard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white-100">
      <TfiWallet size={100} className="text-blue-900 mb-4" /> 
      <p className="text-center mb-8">
      Add your Expense
      </p>
      <Link to={"/create-expence"}  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none">Add your Expenses</Link>
      
    </div>
  );
};

export default ExpenseCard;