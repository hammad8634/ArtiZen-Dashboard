import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AdminLayout from "../../layouts/AdminLayout";

const CreateProductPage = () => {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const user_token = user_info.token;

  const [productName, setProductName] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [video, setVideo] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [colors, setColors] = useState([]);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    // productImages.forEach((image, index) => {
    //   formData.append(`productImages[${index}]`, image);
    // });

    Object.values(productImages).forEach((productImg) => {
      formData.append("productImages", productImg);
    });

    formData.append("video", video);
    formData.append("originalPrice", originalPrice);
    formData.append("salePrice", salePrice);
    formData.append("category", category);
    formData.append("quantity", quantity);
    colors.forEach((color, index) => {
      formData.append(`colors[${index}]`, color);
    });
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + user_token,
          },
        }
      );

      console.log(`Console after API: ${response.data}`);
      if (response.status === 201) {
        console.log("Product created successfully");
        alert("Product created successfully");
        navigate("/productstable");
      } else {
        console.log("Product creation failed");
        alert("Product creation failed");
      }
    } catch (error) {
      console.error(`API error: ${error}`);
      // Handle error
    }
  };

  const onChanges = (e) => {
    console.log("Value of e.target.files is: " + e.target.files);
    setProductImages(e.target.files);
  };

  const handleRemoveImage = (index) => {
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const colorOptions = [
    { value: null, label: "None" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "orange", label: "Orange" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
  ];

  const categoryOptions = [
    { value: "cloth", label: "Cloth" },
    { value: "utils", label: "Utils" },
    { value: "handmade", label: "Hand Made" },
    { value: "antique", label: "Antique" },
  ];
  const handleColorChange = (selectedOptions) => {
    console.log("Selected Options:", selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    console.log("Selected Values:", selectedValues);
    setColors(selectedValues);
  };

  const handleCategoryChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    const selectedOptionObj = categoryOptions.find(
      (option) => option.value === selectedValue
    );

    console.log("Selected Category:", selectedOptionObj);
    setCategory(selectedOptionObj.label);
  };

  return (
    <AdminLayout>
      <div className="flex justify-center  bg-gray-200 text-sm">
        <div className="w-full max-w-8xl bg-white shadow-md rounded-lg">
          <div className="mb-3 mt bg-gray-100 p-10">
            <h2 className="text-2xl font-medium mb-6">Create Product</h2>
            <div className="flex mb-8">
              <div className="w-1/2 pr-2">
                <label htmlFor="productName" className="block mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="productImages" className="block mb-2">
                  Product Images
                </label>
                <input
                  type="file"
                  id="productImages"
                  name="productImages"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  accept="image/*"
                  multiple
                  onChange={onChanges}
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block mb-2">Uploaded Images</label>
              {productImages.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {Object.values(productImages).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`img ${index + 1}`}
                        className="w-50 h-40 object-cover rounded-lg  "
                      />
                      <button
                        className="absolute top-0 right-0 pl-1 pr-1 bg-red-500 text-white rounded-lg hover:bg-red-600 "
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No images uploaded.</p>
              )}
            </div>

            <div className="flex mb-8">
              <div className="w-1/2 pr-2">
                <label htmlFor="video" className="block mb-2">
                  Product Video
                </label>
                <input
                  type="text"
                  id="video"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="quantity" className="block mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mb-8">
              <div className="w-1/2 pr-2">
                <label htmlFor="originalPrice" className="block mb-2">
                  Original Price
                </label>
                <input
                  type="text"
                  id="originalPrice"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="salePrice" className="block mb-2">
                  Sale Price
                </label>
                <input
                  type="text"
                  id="salePrice"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mb-8">
              <div className="w-1/2 pr-2">
                <label htmlFor="category" className="block mb-2">
                  Category
                </label>
                <Select
                  id="category"
                  options={categoryOptions}
                  required
                  value={category.value}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="w-1/2 pl-2">
                <div className="mb-8">
                  <label htmlFor="colorPicker" className="block mb-2">
                    Color
                  </label>
                  <Select
                    id="colorPicker"
                    options={colorOptions}
                    isMulti
                    required
                    value={colorOptions.filter((option) =>
                      colors.includes(option.value)
                    )}
                    onChange={handleColorChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="description" className="block mb-2">
                Description
              </label>
              <textarea
                id="description"
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500"
                onClick={handleCreateProduct}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateProductPage;
