import React, { useEffect, useRef, useState } from "react";
import { FileIcon, UploadCloudIcon, ImageOff, XIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function ImageUpload({
  file = [],
  setFile,
  uploadImageUrl,
  setUploadImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]); // Stores image previews

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array

    // Limit to max 4 images
    if (selectedFiles.length + file.length > 4) {
      toast.error("You can upload a maximum of 4 images.");
      return;
    }

    const updatedFiles = [...file, ...selectedFiles]; // Append new images
    setFile(updatedFiles);

    // Generate previews
    const newPreviews = updatedFiles.map((f) => URL.createObjectURL(f));
    setPreviews(newPreviews);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.classList.add("bg-gray-100");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove("bg-gray-100");
    const droppedFiles = Array.from(e.dataTransfer.files);

    // Limit to max 4 images
    if (droppedFiles.length + file.length > 4) {
      toast.error("You can upload a maximum of 4 images.");
      return;
    }

    const updatedFiles = [...file, ...droppedFiles];
    setFile(updatedFiles);

    // Generate previews
    const newPreviews = updatedFiles.map((f) => URL.createObjectURL(f));
    setPreviews(newPreviews);
  };

  // Remove all images
  const handleRemoveImage = () => {
    setFile([]);
    setPreviews([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  // Upload image to backend
  const uploadImageToCloud = async () => {
    setImageLoadingState(true);
    const formData = new FormData();

    // Append each file to FormData
    file.forEach((f) => formData.append("my_files", f));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(response.status);
      console.log(response);
      if (response.status == 200) {
        setUploadImageUrl(response.data.results);
        toast.success("Images uploaded successfully!");
      } else {
        toast.error("Failed to upload images");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error uploading images");
    } finally {
      setImageLoadingState(false);
    }
  };

  // Upload images whenever files are selected
  useEffect(() => {
    if (file.length > 0) uploadImageToCloud();
  }, [file]);

  return (
    <div className="w-full max-w-md mx-auto h-fit">
      <label className="text-lg mb-2 block">Upload Images (Max: 4)</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={` ${
          isEditMode ? "opacity-40" : ""
        } border-2 border-dashed rounded-lg p-4 mb-4`}
      >
        <input
          id="image-upload"
          type="file"
          className="hidden mb-4"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          disabled={imageLoadingState || isEditMode}
        />

        {/* If no images, show upload button */}
        {file.length === 0 ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            {isEditMode ? (
              <ImageOff className="w-10 h-10 text-muted-foreground mb-2" />
            ) : (
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            )}
            <span>
              {isEditMode
                ? "Edit Product Not Upload Image"
                : "Drag & drop or click to upload images"}
            </span>
          </label>
        ) : imageLoadingState ? (
          <div className="flex items-center justify-center h-32">
            <FileIcon className="w-10 h-10 text-muted-foreground" />
            <span className="text-2xl font-semibold ">Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Preview Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
              {previews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
              ))}
            </div>

            {/* Remove Images Button */}
            <button
              className="text-red-500 hover:text-red-700 flex items-center mt-2"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4 mr-2" />
              Remove All Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
