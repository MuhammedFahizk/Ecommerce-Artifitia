import React, { useState, useMemo, useCallback } from "react";
import { Card, Div, Text, Button } from "../common/Index"; // Assuming Button is imported for pagination
import { useFetchProducts } from "../../hooks/useFetchProducts";

export const Products = ({ pagination, setPagination, selectedSubCategories }) => {
  const { products, loading, error, cart } = useFetchProducts(pagination, setPagination, selectedSubCategories);
  
  const handlePageChange = useCallback((page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  }, [setPagination]);

  const handleLimitChange = useCallback((newLimit) => {
    if (newLimit !== pagination.limit) {
      setPagination((prev) => ({ ...prev, limit: newLimit, currentPage: 1 })); 
    }
  }, [pagination.limit, setPagination]);

  const paginationMemo = useMemo(() => {
    return Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
  }, [pagination.totalPages]);

  return (
    <Div className={"col-span-4 p-4 px-10"}>
      {loading ? (
        <Text className={"text-white"}>Loading products...</Text>
      ) : error ? (
        <Text className={"text-white"}>{error}</Text>
      ) : (
        <Div>
          <Div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.length > 0 ? (
              products.map((product, index) => (
                <Card key={index} product={product} cart={cart} />
              ))
            ) : (
              <Text className={"text-white"}>No products available</Text>
            )}
          </Div>
          <Div className={"w-full flex justify-between py-4 items-center"}>
            <Text className={"text-xs text-gray-500 font-semibold"}>
              {products.length} of {pagination.totalProducts} items
            </Text>
            <Div className="flex space-x-2">
              {paginationMemo.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-full ${
                    page === pagination.currentPage
                      ? "bg-secondary text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </Div>
            <Div className={"flex justify-center items-center h-fit"}>
              <Text className={"text-xs text-gray-500 font-semibold "}>
                Show rows:
              </Text>
              <select
                className="px-3 py-1 text-secondary rounded-md text-xs ml-2"
                value={pagination.limit}
                onChange={(e) => handleLimitChange(parseInt(e.target.value, 10))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </Div>
          </Div>
        </Div>
      )}
    </Div>
  );
};
