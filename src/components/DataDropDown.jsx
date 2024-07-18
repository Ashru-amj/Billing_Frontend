import React, { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const DataDropDown = ({ onDateRangeChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDateRangeClick = (range) => {
    onDateRangeChange(range);
    setDropdownOpen(false);
  };

  return (
    <div className="flex items-center space-x-4 relative">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <RiArrowDropDownLine className="mr-2" />
        📊 Show Transactions
      </button>

      {dropdownOpen && (
        <div ref={dropdownRef} className="absolute mt-20 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul>
            <li onClick={() => handleDateRangeClick('today')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Today</li>
            <li onClick={() => handleDateRangeClick('this_week')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">This Week</li>
            <li onClick={() => handleDateRangeClick('this_month')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">This Month</li>
            <li onClick={() => handleDateRangeClick('quarterly')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Quarterly</li>
            <li onClick={() => handleDateRangeClick('halfyearly')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Halfyearly</li>
            <li onClick={() => handleDateRangeClick('this_year')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">This Year</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataDropDown;