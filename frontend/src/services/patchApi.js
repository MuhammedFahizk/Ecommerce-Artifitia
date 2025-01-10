import { apiInstance } from "./apiInstence";

/**
 * Updates a product by its ID.
 * @param {Object} data - The updated product data.
 * @param {string} productId - The ID of the product to be updated.
 * @returns {Promise<Object>} - API response data.
 */
export const updateProduct = async (data, productId) => {
  try {
    const response = await apiInstance.patch(`/updateProduct/${productId}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error.response ? error.response.data : new Error("Unable to update product. Please try again.");
  }
};
