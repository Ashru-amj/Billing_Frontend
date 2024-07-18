


import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FcCalculator } from "react-icons/fc";


// const CalculatorLogo = ({ onPress }) => {
//   return (
//     <button onClick={onPress} className="flex flex-col items-center">
//         <FcCalculator className="w-24 h-24 mb-4" />
//       <span className="px-4 py-2 bg-blue-500 text-white rounded">
//         Open Calculator
//       </span>
//     </button>
//   );
// };

const CalculatorScreen = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleEvaluate = () => {
    try {
      setResult(eval(input)); // Warning: Using eval can be unsafe
    } catch {
      setResult(result);
    }
  };


  return (
    <div className="p-1 bg-white rounded shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={result}
          readOnly
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/'].map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value)}
            className="p-2 bg-gray-200 rounded"
          >
            {value}
          </button>
        ))}
        {['4', '5', '6', '*'].map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value)}
            className="p-2 bg-gray-200 rounded"
          >
            {value}
          </button>
        ))}
        {['1', '2', '3', '-'].map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value)}
            className="p-2 bg-gray-200 rounded"
          >
            {value}
          </button>
        ))}
        {['0', '.', '=', '+'].map((value) => (
          <button
            key={value}
            onClick={() => (value === '=' ? handleEvaluate() : handleButtonClick(value))}
            className="p-2 bg-gray-200 rounded"
          >
            {value}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="col-span-4 p-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Close Calculator
      </button>
    </div>
  );
};

const Calculator = ({calOpen,setCalOpen}) => {

  const toggleCalculator = () => {
    setCalOpen((prevState) => !prevState);
  };

  return (
    <div className=" absolute flex items-center justify-center  bg-gray-100">
      {calOpen && (
        <CalculatorScreen onClose={toggleCalculator} />
      ) }
    </div>
  );
};

export default Calculator;