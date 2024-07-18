import React from "react";
import AddItem from "../components/AddItem";

const ItemsPage = () => {
  return (
    <div>
      <AddItem />
    </div>
  );
};

export default ItemsPage;

// import React, { useState } from "react";
// import { FaToggleOn, FaToggleOff } from "react-icons/fa";

// const styles = {
//   container: {
//     width: "100%",
//     margin: "1rem auto",
//   },
//   navbar: {
//     display: "flex",
//     alignItems: "center",
//     padding: "10px",
//     backgroundColor: "#f5f5f5",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//     borderRadius: "4px",
//     marginBottom: "20px",
//   },
//   searchInput: {
//     flexGrow: 1,
//     padding: "5px",
//     marginRight: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
//   addSaleBtn: {
//     backgroundColor: "#ff4c4c",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "5px 10px",
//     marginRight: "10px",
//     cursor: "pointer",
//   },
//   addPurchaseBtn: {
//     backgroundColor: "#4c8aff",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "5px 10px",
//     marginRight: "10px",
//     cursor: "pointer",
//   },
//   addMoreBtn: {
//     backgroundColor: "#4c8aff",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "5px 10px",
//     cursor: "pointer",
//   },
//   addItemSection: {
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     padding: "20px",
//     marginBottom: "20px",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//   },
//   addItemsHeader: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   checkboxContainer: {
//     marginBottom: "10px",
//   },
//   checkbox: {
//     marginRight: "5px",
//   },
//   checkboxLabel: {
//     marginRight: "15px",
//   },
//   itemDetailsContainer: {
//     display: "flex",
//     marginBottom: "10px",
//   },
//   itemInput: {
//     flex: 1,
//     padding: "5px",
//     marginRight: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
//   selectUnit: {
//     padding: "5px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     minWidth: "120px",
//   },
//   additionalDetailsContainer: {
//     display: "flex",
//     marginBottom: "10px",
//   },
//   hr: {
//     borderTop: "1px solid #ccc",
//     width: "100%",
//     margin: "20px 0",
//   },
//   salesPriceSection: {
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     padding: "20px",
//     marginBottom: "20px",
//     marginTop: "20px",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//   },
//   salePriceHeader: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   salesPriceContainer: {
//     display: "flex",
//     marginBottom: "10px",
//   },
//   saleInput: {
//     padding: "5px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     marginRight: "10px",
//   },
//   selectWithoutTax: {
//     padding: "5px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     marginRight: "10px",
//   },
//   discountInput: {
//     padding: "5px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     marginRight: "10px",
//   },
//   selectPercentage: {
//     padding: "5px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
//   additionalInfoSection: {
//     display: "inline-block",
//     width: "calc(50% - 5px)", // Adjust according to your preference
//     verticalAlign: "top",
//     marginBottom: "10px",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//     padding: "20px",
//     borderRadius: "4px",
//   },
//   addWholesalePriceBtn: {
//     backgroundColor: "blue",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "10px 20px",
//     marginBottom: "10px",
//     cursor: "pointer",
//   },
//   wholesaleInput: {
//     padding: "5px",
//     border: "1px solid blue",
//     borderRadius: "4px",
//     marginRight: "10px",
//   },
//   toggleButton: {
//     backgroundColor: "blue",
//     color: "white",
//     padding: "10px",
//     textAlign: "center",
//     borderRadius: "4px",
//     cursor: "pointer",
//     display: "flex",
//     width: "auto",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: "20px",
//   },
//   saveButton: {
//     backgroundColor: "blue",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "10px 20px",
//     cursor: "pointer",
//   },
// };

// const Sales = () => {
//   const [view, setView] = useState(true); // true for product details, false for service details
//   const [wholesalePrices, setWholesalePrices] = useState([]);

//   const handleAddWholesalePrice = () => {
//     setWholesalePrices([...wholesalePrices, ""]);
//   };

//   const handleWholesalePriceChange = (index, value) => {
//     const newWholesalePrices = [...wholesalePrices];
//     newWholesalePrices[index] = value;
//     setWholesalePrices(newWholesalePrices);
//   };

//   const toggleView = () => {
//     setView(!view);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.toggleButton} onClick={toggleView}>
//         {view ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
//         <span style={{ marginLeft: "10px" }}>
//           {view ? "Switch to Service Details" : "Switch to Product Details"}
//         </span>
//       </div>
//       {view ? (
//         <div>
//           <div style={styles.addItemSection}>
//             <div style={styles.addItemsHeader}>ADD ITEMS</div>
//             <div style={styles.itemDetailsContainer}>
//               <input
//                 type="text"
//                 placeholder="Item Name"
//                 style={styles.itemInput}
//               />
//               <input
//                 type="text"
//                 placeholder="Item HSN No"
//                 style={styles.itemInput}
//               />
//               <select style={styles.selectUnit}>
//                 <option value="">Select Unit</option>
//                 <option value="unit1">Unit 1</option>
//                 <option value="unit2">Unit 2</option>
//                 <option value="unit3">Unit 3</option>
//               </select>
//             </div>
//             <div style={styles.additionalDetailsContainer}>
//               <input
//                 type="text"
//                 placeholder="Category"
//                 style={styles.itemInput}
//               />
//               <input
//                 type="text"
//                 placeholder="Item Code"
//                 style={styles.itemInput}
//               />
//             </div>
//           </div>
//           <hr style={styles.hr} />
//           <div style={styles.salesPriceSection}>
//             <div style={styles.salePriceHeader}>SALES Price</div>
//             <div style={styles.salesPriceContainer}>
//               <input
//                 type="text"
//                 placeholder="Sales Price"
//                 style={styles.saleInput}
//               />
//               <select style={styles.selectWithoutTax}>
//                 <option value="Yes">Without Tax</option>
//                 <option value="No">With Tax</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Disc. on Sales Price"
//                 style={styles.discountInput}
//               />
//               <select style={styles.selectPercentage}>
//                 <option value="">%</option>
//                 <option value="5">5%</option>
//                 <option value="10">10%</option>
//                 <option value="15">15%</option>
//               </select>
//             </div>
//           </div>
//           <div style={{ margin: "10px 0" }}>
//             <button
//               style={styles.addWholesalePriceBtn}
//               onClick={handleAddWholesalePrice}
//             >
//               +ADD WHOLESALE PRICE
//             </button>
//             {wholesalePrices.map((price, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 // placeholder={Wholesale Price ${index + 1}}
//                 placeholder={`Wholesale Price ${index + 1}`}
//                 style={styles.wholesaleInput}
//                 value={price}
//                 onChange={(e) =>
//                   handleWholesalePriceChange(index, e.target.value)
//                 }
//               />
//             ))}
//           </div>
//           <div className="flex item-center pt-4 py-2 my-4 border justify-between">
//             <div className="mx-8 border" style={styles.additionalInfoSection}>
//               <h3 className="text-2xl">Purchase Price</h3>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Purchase Price"
//                   style={styles.discountInput}
//                 />
//                 <select style={styles.selectWithoutTax}>
//                   <option value="Yes">Without Tax</option>
//                   <option value="No">With Tax</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mx-8 border" style={styles.additionalInfoSection}>
//               <h3 className="text-2xl">Taxes</h3>
//               <div className="inline-block">
//                 <label htmlFor="taxes">Taxes Rate</label>
//                 <select style={styles.selectWithoutTax}>
//                   <option value="Yes">Without Tax</option>
//                   <option value="No">With Tax</option>
//                 </select>
//               </div>
//               <div className="inline-block ml-4">
//                 <label htmlFor="gst">GST Rate</label>
//                 <select style={styles.selectGst} className="border">
//                   <option value="0%">GST@0%</option>
//                   <option value="0%">IGST@0%</option>
//                   <option value="5%">GST5%</option>
//                   <option value="5%">IGST5%</option>
//                   <option value="12%">GST12%</option>
//                   <option value="12%">IGST12%</option>
//                   <option value="18%">GST18%</option>
//                   <option value="18%">IGST18%</option>
//                   <option value="28%">GST28%</option>
//                   <option value="28%">IGST28%</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div style={styles.footer}>
//             <button style={styles.saveButton} onClick={toggleView}>
//               SAVE
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div style={styles.addItemSection}>
//             <div style={styles.itemDetailsContainer}>
//               <input
//                 type="text"
//                 placeholder="Service Name"
//                 style={styles.itemInput}
//               />
//               <input
//                 type="text"
//                 placeholder="Service HSN No"
//                 style={styles.itemInput}
//               />
//               <select style={styles.selectUnit}>
//                 <option value="">Select Unit</option>
//                 <option value="unit1">Unit 1</option>
//                 <option value="unit2">Unit 2</option>
//                 <option value="unit3">Unit 3</option>
//               </select>
//             </div>
//             <div style={styles.additionalDetailsContainer}>
//               <input
//                 type="text"
//                 placeholder="Category"
//                 style={styles.itemInput}
//               />
//               <input
//                 type="text"
//                 placeholder="Service Code"
//                 style={styles.itemInput}
//               />
//             </div>
//           </div>
//           <hr style={styles.hr} />
//           <div style={styles.salesPriceSection}>
//             <div style={styles.salePriceHeader}>SALES Price</div>
//             <div style={styles.salesPriceContainer}>
//               <input
//                 type="text"
//                 placeholder="Sales Price"
//                 style={styles.saleInput}
//               />
//               <select style={styles.selectWithoutTax}>
//                 <option value="Yes">Without Tax</option>
//                 <option value="No">With Tax</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Disc. on Sales Price"
//                 style={styles.discountInput}
//               />
//               <select style={styles.selectPercentage}>
//                 <option value="">%</option>
//                 <option value="5">5%</option>
//                 <option value="10">10%</option>
//                 <option value="15">15%</option>
//               </select>
//             </div>
//           </div>
//           <div style={{ margin: "10px 0" }}>
//             <button
//               style={styles.addWholesalePriceBtn}
//               onClick={handleAddWholesalePrice}
//             >
//               +ADD WHOLESALE PRICE
//             </button>
//             {wholesalePrices.map((price, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 placeholder={`Wholesale Price ${index + 1}`}
//                 style={styles.wholesaleInput}
//                 value={price}
//                 onChange={(e) =>
//                   handleWholesalePriceChange(index, e.target.value)
//                 }
//               />
//             ))}
//           </div>
//           <div className="flex item-center pt-4 py-2 my-4 border justify-between">
//             <div className="mx-8 border" style={styles.additionalInfoSection}>
//               <h3 className="text-2xl">Taxes</h3>
//               <div className="inline-block">
//                 <label htmlFor="taxes">Taxes Rate</label>
//                 <select style={styles.selectWithoutTax}>
//                   <option value="Yes">Without Tax</option>
//                   <option value="No">With Tax</option>
//                 </select>
//               </div>
//               <div className="inline-block ml-4">
//                 <label htmlFor="gst">GST Rate</label>
//                 <select style={styles.selectGst} className="border">
//                   <option value="0%">GST@0%</option>
//                   <option value="0%">IGST@0%</option>
//                   <option value="5%">GST5%</option>
//                   <option value="5%">IGST5%</option>
//                   <option value="12%">GST12%</option>
//                   <option value="12%">IGST12%</option>
//                   <option value="18%">GST18%</option>
//                   <option value="18%">IGST18%</option>
//                   <option value="28%">GST28%</option>
//                   <option value="28%">IGST28%</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div style={styles.footer} className="flex items-center justify-end">
//             <button style={styles.saveButton} className="flex ">
//               SAVE
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sales;
