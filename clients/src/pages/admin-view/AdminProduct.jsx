import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../../components/common/CommonForm";
import { addProductFormElements } from "../../config/FormConfig";
import ImageUpload from "../../components/admin-view/ImageUpload";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "../../store/products-slice";
import { toast } from "react-toastify";
import ProductCard from "../../components/admin-view/ProductCard";

function AdminProduct() {
  const [addproductPopup, setAddProductPopup] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [uploadImageUrl, setUploadImageUrl] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const [currentEditProductId, setCurrentEditProductId] = useState(null);
  const { productList } = useSelector((state) => state.adminProdcuts);
  const initailFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };
  const [formData, setFormData] = useState(initailFormData);

  console.log(formData, productList, uploadImageUrl);
  function onSubmit(e) {
    e.preventDefault();
    if (currentEditProductId !== null) {
      dispatch(
        editProduct({ id: currentEditProductId, formData: formData })
      ).then((data) => {
        console.log(data, "edit");
        if (typeof data.payload === "string") {
          // Handle error
          setFormData(initailFormData);
          setImageFile([]);
          setUploadImageUrl([]);
          dispatch(fetchAllProducts());
          setAddProductPopup(false);
          toast.error(data.payload);
        } else {
          // Handle success
          setFormData(initailFormData);
          setImageFile([]);
          setUploadImageUrl([]);
          dispatch(fetchAllProducts());
          setAddProductPopup(false);
          toast.success("Product Edit successfully");
        }
      });
    } else {
      formData.image = uploadImageUrl;
      dispatch(addNewProduct(formData)).then((data) => {
        console.log(data, "add");
        if (typeof data.payload === "string") {
          // Handle error
          setFormData(initailFormData);
          setImageFile([]);
          dispatch(fetchAllProducts());
          setAddProductPopup(false);
          toast.error(data.payload);
        } else {
          // Handle success
          setFormData(initailFormData);
          setImageFile([]);
          setUploadImageUrl([]);
          dispatch(fetchAllProducts());
          setAddProductPopup(false);
          toast.success("Product Add successfully");
        }
      });
    }
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 flex flex-col w-full relative min-h-screen">
        <div className="w-full justify-end flex">
          <button
            className="bg-black text-white px-3 rounded-3xl py-1.5 "
            onClick={() => {
              setAddProductPopup(true);
              setFormData(initailFormData);
              setImageFile([]);
              setCurrentEditProductId(null);
            }}
          >
            Add New Product
          </button>
        </div>
        <div className="flex flex-wrap gap-5">
          {productList.map((product) => (
            <ProductCard
              product={product}
              setAddProductPopup={setAddProductPopup}
              setFormData={setFormData}
              setCurrentEditProductId={setCurrentEditProductId}
            />
          ))}
        </div>
        <div
          className={`w-[25vw] bg-gray-200 ${
            addproductPopup ? "right-0" : "right-[-30vw]"
          } absolute ease-in duration-300 flex flex-col gap-2 p-5 h-screen snap-none`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {currentEditProductId !== null
                ? "Edit Product"
                : "Add New Product"}
            </h2>
            <button
              className="text-black px-3 rounded-3xl py-1.5 font-semibold"
              onClick={() => setAddProductPopup(false)}
            >
              Close
            </button>
          </div>
          <div className="p-3 min-h-[calc(100vh-100px)] overflow-auto">
            <ImageUpload
              file={imageFile}
              setFile={setImageFile}
              uploadImageUrl={uploadImageUrl}
              setUploadImageUrl={setUploadImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditProductId !== null}
            />
            <CommonForm
              formControls={addProductFormElements}
              buttonText={
                currentEditProductId !== null ? "Edit Product" : "Add Product"
              }
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminProduct;
