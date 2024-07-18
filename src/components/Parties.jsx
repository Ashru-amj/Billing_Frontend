import React from 'react';

const Parties = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Your Business</h2>
      <img className="max-w-full w-70 mb-8" style={{ height: '50%' }} src="https://img.freepik.com/free-vector/flat-design-teamwork-logo-template_23-2149492022.jpg" alt="Teamwork Logo" />
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded mb-8">
        Add Your First Party
      </button>
     
        <h2>List item 1</h2>
 
    </div>
  );
}

export default Parties;
