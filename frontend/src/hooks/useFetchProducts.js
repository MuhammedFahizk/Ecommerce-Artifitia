import { useState, useEffect } from "react";
import { getAllProducts } from "../services/postApi";

export const useFetchProducts = (pagination, setPagination) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(pagination.currentPage, pagination.limit);
      setProducts(response.data.products);
      setPagination(prev => ({
        ...prev, 
        totalProducts: response.data.pagination.totalProducts, 
        totalPages: response.data.pagination.totalPages
      }));      setCart(response.data.cart);
      setLoading(false);
    } catch (error) {
      setError("Error fetching products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.limit, pagination.currentPage]); // Trigger fetch when limit or page changes

  return { products, loading, error, cart };
};
