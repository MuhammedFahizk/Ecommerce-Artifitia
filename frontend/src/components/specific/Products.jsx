import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/postApi";
import { Card, Div, Text } from "../common/Index"; // Assuming Text is also imported for displaying product details

export const Products = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
    const [cart, setCart] = useState ( [])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts(); 
        setProducts(response.data.products);
        setCart(response.data.cart)
        setLoading(false); 
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Div className={'col-span-4  p-4 px-10'}>
      {loading ? (
        <Text className={'text-white'}>Loading products...</Text> // Display loading text
      ) : error ? (
        <Text className={'text-white'}>{error}</Text> // Display error message if there is an issue
      ) : (
        <Div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product, index) => (
            <Card key={index} product={product} cart={cart}/>
            ))
          ) : (
            <Text className={'text-white'}>No products available</Text> // If no products are found
          )}
        </Div>
      )}
    </Div>
  );
};
