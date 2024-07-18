import React from "react";
import { FaEllipsisV, FaTrashAlt, FaEdit, FaShare } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

const DeleteShareEdit = ({ setOpen, orderData }) => {
  console.log(orderData);
  console.log("hello");
  console.log(setOpen);
  return (
    <div className="w-60 h-60 flex items-center justify-center">
      <div className="relative">
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              // onClick={() => setEditOpen(true)}
          >
            <FaEdit className="inline-block mr-2" />
            Edit
          </button>
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            //   onClick={() => setDeleteOpen(true)}
          >
            <FaTrashAlt className="inline-block mr-2" />
            Delete
          </button>
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            //   onClick={() => setShareOpen(true)}
          >
            <FaShare className="inline-block mr-2" />
            Share
          </button>
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              console.log("Hello world");
              setOpen(false);
            }}
          >
            <IoCloseCircleOutline className="inline-block mr-2" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteShareEdit;
