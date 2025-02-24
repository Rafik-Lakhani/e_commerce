import React, { Fragment, useState } from "react";
import CommonForm from "../../components/common/CommonForm";
import { addProductFormElements } from "../../config/FormConfig";
import ImageUpload from "../../components/admin-view/ImageUpload";

function AdminProduct() {
  const [addproductPopup, setAddProductPopup] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [uploadImageUrl, setUploadImageUrl] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [formDate, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  });

   console.log(formDate);
  function onSubmit() {}

  return (
    <Fragment>
      <div className="mb-5 flex flex-col w-full relative min-h-screen">
        <div className="w-full justify-end flex">
          <button
            className="bg-black text-white px-3 rounded-3xl py-1.5 "
            onClick={() => setAddProductPopup(true)}
          >
            Add New Product
          </button>
        </div>
        <div
          className={`w-[25vw] bg-gray-200 ${
            addproductPopup ? "right-0" : "right-[-30vw]"
          } absolute ease-in duration-300 flex flex-col gap-2 p-5 h-screen snap-none`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add New Product</h2>
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
            />
            <CommonForm
              formControls={addProductFormElements}
              buttonText={"Add Product"}
              formData={formDate}
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
