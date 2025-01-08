import express from "express";

import categoryController  from '../controllers/index.js'
import { requireAuthentication } from "../middleware/autchCheck.js";

const router = express.Router();

router.use(requireAuthentication)
/**
 * @route POST /api/users/creteCategory
 * @description User Crete category Registration
 * @access Public
 * @param {Object} req - Express request object containing user data
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message and user data or error details
 */
router.post("/createCategory", categoryController.createCategory);


/**
 * @method - Get category
 * @param {string} path - /api/users/category
 * @description - fetch user category data
 */
router.get("/category",  categoryController.getCategory);


/**
 * @method - Get Sub category
 * @param {string} path - /api/users/category
 * @description - fetch user category data
 */
router.get("/getSubcategory",  categoryController.getSubCategory);



/**
 * @route POST /api/users/creteSubCategory
 * @description User Crete Sub category Registration
 * @access Public
 * @param {Object} req - Express request object containing user data
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message and user data or error details
 */
router.post("/createSubCategory", categoryController.createCategory);


/**
 * @route POST /api/users/createProduct
 * @description User Crete Sub category Registration
 * @access Public
 * @param {Object} req - Express request object containing product data
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message and product  data or error details
 */
router.post("/createProduct", categoryController.createProduct);

export default router;
