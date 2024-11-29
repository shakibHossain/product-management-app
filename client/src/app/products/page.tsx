"use client";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/state/api";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import ProductModal from "./ProductModal";
import Image from "next/image";

type ProductFormData = {
  productId?: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormData | null>(null); // State to hold selected product for editing
  const [deleteProduct] = useDeleteProductMutation();

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  const handleEditProduct = async (productData: ProductFormData) => {
    if (selectedProduct) {
      await updateProduct({
        ...productData,
        productId: selectedProduct.productId,
      });
    }
  };

  const handleDelete = async (product: ProductFormData) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(product.productId as any);
        alert("Product deleted successfully");
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  const openCreateModal = () => {
    setSelectedProduct(null); // Reset selected product for create mode
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductFormData) => {
    setSelectedProduct(product); // Set product to be edited
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={openCreateModal}
        >
          Create Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`https://s3-product-management-app.s3.us-east-1.amazonaws.com/product-${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
                <br />
                <button
                  className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                  onClick={() => openEditModal(product as ProductFormData)}
                >
                  Edit Product
                </button>
                <br />
                <button
                  className="flex items-center bg-red-500 hover:bg-red-700 text-gray-200 font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(product as ProductFormData)}
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedProduct ? handleEditProduct : handleCreateProduct}
        product={selectedProduct as ProductFormData}
      />
    </div>
  );
};

export default Products;
