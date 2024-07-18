import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

const Excel = () => {
  const exportToExcel = () => {
    // Prepare data
    const data = [
      { name: 'John', age: 30, city: 'New York' },
      { name: 'Jane', age: 25, city: 'Los Angeles' },
      { name: 'Doe', age: 40, city: 'Chicago' },
    ];

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'People');

    // Save workbook as an Excel file
    XLSX.writeFile(wb, 'SampleData.xlsx');
  };

  return (
    <div>
      {/* Button to export to Excel */}
      <button onClick={exportToExcel}>
        <FontAwesomeIcon icon={faFileExcel} size="2x" />
      </button>
    </div>
  );
};

export default Excel;
