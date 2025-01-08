import { apiInstance } from "./apiInstence";

/**
 * Return borrowed book by user 
 * @param {Object} data - Contains the borrowId and possibly other relevant information.
 * @returns {Promise} - API response
 */
export const returnBook = async (borrowId) => {
    
  try {
    const response = await apiInstance.put(`/book/return/${borrowId}`, {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error("Error returning book:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};
