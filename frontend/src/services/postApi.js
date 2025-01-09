import { apiInstance } from "./apiInstence";

/**
 * Logs in a user.
 * 
 * @param {object} data - The account credentials.
 * @param {string} data.email - Email of the account.
 * @param {string} data.password - Password of the account.
 * @returns {Promise<object>} - The server's response.
 * @throws {Error} - Throws an error if login fails.
 */
export const loginUser = async (data) => {
  try {
    const response = await apiInstance.post("/user/login", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Registers a new user.
 * 
 * @param {object} data - The account details.
 * @param {string} data.username - Username of the new account.
 * @param {string} data.email - Email of the new account.
 * @param {string} data.password - Password for the account.
 * @returns {Promise<object>} - The server's response.
 * @throws {Error} - Throws an error if registration fails.
 */
export const signupUser = async (data) => {
  try {
    const response = await apiInstance.post("/user/register", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Refreshes the access token.
 * 
 * @returns {Promise<object>} - The response containing the new access token.
 * @throws {Error} - Throws an error if the refresh request fails.
 */
export const refreshAccessToken = async () => {
  try {
    const response = await apiInstance.post("/user/reauth", {}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Logs out the current user.
 * 
 * @returns {Promise<void>} - No response body.
 * @throws {Error} - Throws an error if logout fails.
 */
export const logout = async () => {
  try {
    const response = await apiInstance.post("/user/logout", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Logs out the current user from all devices.
 * 
 * @returns {Promise<void>} - No response body.
 * @throws {Error} - Throws an error if logout fails.
 */
export const logoutEveryDevice = async () => {
  try {
    const response = await apiInstance.post("/user/master-logout", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging out from all devices:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Creates a new category.
 * 
 * @param {object} data - The category details.
 * @returns {Promise<object>} - The server's response.
 * @throws {Error} - Throws an error if category creation fails.
 */
export const addCategory = async (data) => {
  try {
    const response = await apiInstance.post("/createCategory", data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Creates a new subcategory.
 * 
 * @param {object} data - The subcategory details.
 * @returns {Promise<object>} - The server's response.
 * @throws {Error} - Throws an error if subcategory creation fails.
 */
export const addSubCategory = async (data) => {
  try {
    const response = await apiInstance.post("/createSubCategory", data);
    return response.data;
  } catch (error) {
    console.error("Error creating subcategory:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Creates a new product.
 * 
 * @param {object} data - The product details.
 * @param {string} data.subCategory - Subcategory ID.
 * @param {string} data.productName - Name of the product.
 * @param {string} data.description - Description of the product.
 * @param {array} data.variants - Array of product variants.
 * @param {array} data.images - Array of file arrays (images) for the product.
 * @returns {Promise<object>} - The server's response.
 * @throws {Error} - Throws an error if product creation fails.
 */
export const addProduct = async (data) => {
  try {
    const formData = new FormData();

    formData.append("subCategory", data.subCategory);
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("variants", JSON.stringify(data.variants.map((Variant) => Variant.data)));

    if (data.images) {
      data.images.forEach((fileArray, index) => {
        fileArray.forEach((file) => {
          formData.append(`images[${index}]`, file);
        });
      });
    }

    const response = await apiInstance.post("/createProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Retrieves all products.
 * 
 * @returns {Promise<object>} - The server's response containing product data.
 * @throws {Error} - Throws an error if fetching products fails.
 */
export const getAllProducts = async (page, limit, selectedSubCategories) => {
  try {
    const response = await apiInstance.post("/getAllProducts", {
      page,
      limit,
      subCategory:selectedSubCategories
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


export const AddToCart = async (productId) => {
  try {
    const response = await apiInstance.post(`/addToCart/${productId}`)
    return response.data;

  } catch (error) {
    console.error("Error  add to cart  :", error);
    throw error.response ? error.response.data : new Error(error.message); 

  }
} 
