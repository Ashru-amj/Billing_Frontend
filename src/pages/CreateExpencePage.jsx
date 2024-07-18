import React, { useState } from "react";
import CreateExpenceWithGst from "../components/AddExpence";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import Calculator from "../components/Calculator";
import { BiCommentAdd } from "react-icons/bi";

const CreateExpencePage = () => {
   const [calOpen, setCalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl px-4 mx-4">Expence</h2>
        </div>
        <div className="flex justify-center items-center">
          <button
            className=" py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={(e) => setCalOpen(!calOpen)}
          >
            <BiCommentAdd className="inline mb-1 mr-2 " />
            Calculator
          </button>
        </div>
      </div>
      <div className="flex items-start  justify-end mt-5">
        {calOpen && <Calculator calOpen={calOpen} setCalOpen={setCalOpen} />}
      </div>
      <div>
        <CreateExpenceWithGst />
      </div>
    </div>
  );
};

export default CreateExpencePage;
