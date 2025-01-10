import { useState, useEffect } from "react";
import { getAllProducts } from "../services/postApi";
import { useSelector } from "react-redux";

export const useFetchProducts = (pagination, setPagination, selectedSubCategories) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const { search } = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(
        pagination.currentPage,
        pagination.limit,
        selectedSubCategories,
        search 
      );
      setProducts(response.data.products);
      setPagination((prev) => ({
        ...prev,
        totalProducts: response.data.pagination.totalProducts,
        totalPages: response.data.pagination.totalPages,
      }));
      setCart(response.data.cart);
      setLoading(false);
    } catch (error) {
      setError("Error fetching products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    pagination.limit,
    pagination.currentPage,
    selectedSubCategories,
    search, 
  ]);

  return { products, loading, error, cart };
};
