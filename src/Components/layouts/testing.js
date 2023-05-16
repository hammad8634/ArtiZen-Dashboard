import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";

const CreateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [video, setVideo] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [category, setCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [Description, setDescription] = useState("");

  const handleCreateProduct = async () => {
    if (productImages.length < 3 || productImages.length > 7) {
      alert("Please select between 3 and 7 images.");
      return;
    }

    // Convert productImages array to string URL format
    const imagesString = productImages.join(",");

    const data = {
      productName,
      productImages: imagesString,
      video,
      originalPrice,
      salePrice,
      category,
      colors,
      Description,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/create",
        {
          ...data,
        }
      );

      console.log(response.data);
      // Handle success and navigate to the desired page

      if (response.status === 201) {
        console.log("product created successfully");
        alert("Product created successfully");
      } else if (response.status !== 201) {
        console.log("product Not created successfully");
        alert("Product Not created successfully");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
  ];

  const categoryOptions = [
    { value: "cloth", label: "Cloth" },
    { value: "utils", label: "Utils" },
    { value: "handmade", label: "Hand Made" },
  ];

  const handleColorChange = (selectedOptions) => {
    setColors(selectedOptions);
  };

  const handleCategoryChange = (selectedOptions) => {
    setCategory(selectedOptions);
  };

  const handleImageInputChange = (e) => {
    const files = Array.from(e.target.files);
    const MAX_IMAGES = 7;

    const filePromises = files.slice(0, MAX_IMAGES).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises)
      .then((results) => {
        setProductImages((prevImages) => [...prevImages, ...results]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveImage = (index) => {
    setProductImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <div className="flex justify-center py-4 p-5 bg-gray-200 text-sm">
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
                Product Images (Min 3, Max 7)
              </label>
              <input
                type="file"
                id="productImages"
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
                accept="image/*"
                multiple
                onChange={handleImageInputChange}
              />
            </div>
          </div>
          {/* Display uploaded images */}
          <div className="mb-8">
            <label className="block mb-2">Uploaded Images</label>
            {productImages.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {productImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`img ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-0 right-0 pl-1 pr-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
          <div className="mb-8">
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
          </div>{" "}
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
                category
              </label>
              <Select
                id="category"
                options={categoryOptions}
                isMulti
                required
                value={category}
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
                  value={colors}
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
              value={Description}
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
  );
};

export default CreateProductPage;
