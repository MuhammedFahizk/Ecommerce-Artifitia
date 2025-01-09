import { apiInstance } from "./apiInstence";

/**
 * Fetch user profile
 * @returns {Promise<object>} - User profile data
 */
export const getProfile = async () => {
  try {
    const response = await apiInstance.get("/user/profile");
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


/**
 * Fetch user History
 * @returns {Promise<object>} - User history data
 */
export const getCategory = async () => {
  try {
    const response = await apiInstance.get("/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};



/**
 * Fetch Sub Category 
 * @returns {Promise<object>} - User history data
 */
export const getSubCategory = async () => {
  try {
    const response = await apiInstance.get("/getSubcategory");
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


export const getSubCategoryWithCategory = async (categoryId) => {
  try {
    const response = await apiInstance.get(`/getSubCategoryWithCategory?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


/**
 * Fetch product by id 
 * @returns {Promise<object>} - User history data
 */
export const getProduct = async (id) => {
  try {
    const response = await apiInstance.get(`/getProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};



/**
 * Fetch cart items  by  user 
 * @returns {Promise<object>} - User carts 
 */
export const getCartsItems = async () => {
  try {
    const response = await apiInstance.get(`/user/getCarts`);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};



