import { apiInstance } from "./apiInstence";


/**
 * Login API endpoint
 * @param {object} data - Account Credentials
 * @param {string} data.email - Email used by the account
 * @param {string} data.password - Password
 * 
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
 * Signup API endpoint
 * @param {object} data - Credentials to create account
 * @param {string} data.username - username
 * @param {string} data.email - Email
 * @param {string} data.password - Password
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
 * refreshAccessToken API endpoint
 * Refreshes the access token by sending a request to the /reauth endpoint.
 * 
 * @returns {Promise<object>} - The response containing the new access token.
 * @throws {Error} - Throws an error if the refresh request fails.
 */
export const refreshAccessToken = async () => {
    try {
      const response = await apiInstance.post("/user/reauth", {}, {
        withCredentials: true, // Ensure the cookies are sent with the request
      });
      return response.data;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };
  

/**
 * Logout API endpoint
 * @returns {Promise} - No response body
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
 * logoutEveryDevice API endpoint
 * @returns {Promise} - No response body
 */
export const logoutEveryDevice = async () => {
  try {
    const response = await apiInstance.post("/user/master-logout", { 
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response ? error.response.data : new Error(error.message); 
  }
};




/**
 * Create new Category
 * @returns {Promise} -  response body
 */

export const addCategory = async (data) => {
  try {
    const response = await apiInstance.post('/createCategory', data)
    return response.data;

  } catch (error) {
    console.error("Error  creating category :", error);
    throw error.response ? error.response.data : new Error(error.message); 

  }
} 


/**
 * Create new  Sub Category
 * @returns {Promise} -  response body
 */

export const addSubCategory = async (data) => {
  try {
    const response = await apiInstance.post('/createSubCategory', data)
    return response.data;

  } catch (error) {
    console.error("Error  creating category :", error);
    throw error.response ? error.response.data : new Error(error.message); 

  }
} 



/**
 * Create new  Product
 * @returns {Promise} -  response body
 */

export const addProduct = async (data) => {
  try {
    const response = await apiInstance.post('/createProduct',  {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data
    })
    return response.data;

  } catch (error) {
    console.error("Error  creating category :", error);
    throw error.response ? error.response.data : new Error(error.message); 

  }
} 