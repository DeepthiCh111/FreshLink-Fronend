import React, { useEffect, useState } from "react";
import suppliersData from "../utils/mockdata.json";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import SupplierCard from "../components/SupplierCard";
import { useSelector } from "react-redux";

// Static content
const discountImages = ["/discount1.jpg", "/discount2.jpg", "/discount3.jpg"];
const categories = [
  { name: "Vegetables", color: "bg-green-100" },
  { name: "Spices", color: "bg-yellow-100" },
  { name: "Dairy", color: "bg-blue-100" },
  { name: "Grains", color: "bg-red-100" },
  { name: "Meat", color: "bg-pink-100" },
];

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const searchTerm = useSelector((state) => state.search.term.toLowerCase());

  useEffect(() => {
    const topSuppliers = suppliersData;

    const selectedProducts = topSuppliers.flatMap((sup) =>
      sup.products.map((prod) => ({
        ...prod,
        supplierId: sup.id,
        supplierName: sup.name,
        location: sup.address,
      }))
    );

    const filteredData = suppliersData.flatMap((supplier) => {
      const supplierNameMatch = supplier.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const productNameMatches = supplier.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (supplierNameMatch) {
        // Return all products from this supplier
        return supplier.products.map((product) => ({
          ...product,
          supplierName: supplier.name,
          supplierImage: supplier.image, // optional
        }));
      }

      if (productNameMatches.length > 0) {
        return productNameMatches.map((product) => ({
          ...product,
          supplierName: supplier.name,
          supplierImage: supplier.image, // optional
        }));
      }

      return [];
    });

    setSuppliers(topSuppliers);
    if (searchTerm) setProducts(filteredData);
    else setProducts(selectedProducts);
  }, [searchTerm]);

  return (
    <div className="p-4 mt-24 mx-11">
      {/* Categories */}
      <h2 className="text-2xl  font-bold mb-5">Categories Available</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} name={cat.name} color={cat.color} />
        ))}
      </div>

      {/* Products */}
      <h2 className="text-2xl font-bold mb-5">Top Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {products.map((prod, idx) => (
          <ProductCard key={idx} product={prod} />
        ))}
        {products.length === 0 && (
          <p className="text-gray-500 col-span-full">No products found.</p>
        )}
      </div>

      {/* Suppliers */}
      <h2 className="text-2xl  font-bold mb-5">Featured Suppliers</h2>
      <div className="flex items-center justify-between">
        {suppliers.map((sup) => (
          <SupplierCard key={sup.id} supplier={sup} />
        ))}
        {suppliers.length === 0 && (
          <p className="text-gray-500 col-span-full">No suppliers available.</p>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
