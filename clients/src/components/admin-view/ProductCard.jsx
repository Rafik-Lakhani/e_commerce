import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/products-slice";

function ProductCard({
  product,
  setCurrentEditProductId,
  setFormData,
  setAddProductPopup,
}) {
  const dispatch = useDispatch();
  const handleDeleteProdcut = () => {
    console.log("Delete Product", product._id);
    dispatch(deleteProduct(product._id)).then((data) => {
      console.log(data, "edit");
      if (typeof data.payload === "string") {
        // Handle error
        toast.error(data.payload);
      } else {
        // Handle success
        toast.success("Product Deleted successfully");
      }
    });
  };
  return (
    <div className="bg-white p-4 rounded-lg m-2 w-[14vw] shadow-md">
      <img
        src={product.image[0]}
        alt="Product"
        className="w-full h-auto mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-sm mb-4">Price: ₹{product.price}</p>
      <div className="flex justify-between">
        <button
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setAddProductPopup(true);
            setFormData(product);
            setCurrentEditProductId(product?._id);
          }}
        >
          Edit
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteProdcut}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
