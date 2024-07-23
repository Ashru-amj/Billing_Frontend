import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const LogoutDialog = ({ isOpen, onClose, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Logged out successfully");
      onLogout(); // Call the onLogout function passed from parent
    }, 1000);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-center justify-between p-4 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-lg font-semibold">Logout</h3>
                <button
                  className="text-black"
                  onClick={onClose} // Close button (×) calls onClose function
                >
                  <RxCross2 className="text-2xl" />
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Are you sure you want to logout?
                </p>
              </div>
              <div className="flex items-center justify-end px-6 py-4 bg-gray-50 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onClose} // Cancel button calls onClose function
                >
                  Cancel
                </button>
                <button
                  className={`bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none ${
                    isLoading ? "cursor-not-allowed" : "hover:bg-red-600"
                  }`}
                  type="button"
                  disabled={isLoading}
                  onClick={handleLogout} // Logout button calls handleLogout function
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutDialog;
