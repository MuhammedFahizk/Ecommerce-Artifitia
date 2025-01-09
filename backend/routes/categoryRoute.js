import express from "express";
import categoryController from "../controllers/index.js";
import { requireAuthentication } from "../middleware/autchCheck.js";

const router = express.Router();

// Middleware to check authentication
router.use(requireAuthentication);

/**
 * @route POST /api/users/createCategory
 * @description Creates a new category
 * @access Private
 * @param {Object} req - Express request object containing category data
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message and category data or error details
 */
router.post("/createCategory", categoryController.createCategory);

/**
 * @route GET /api/users/category
 * @description Fetches all categories
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the list of categories or error details
 */
router.get("/category", categoryController.getCategory);

/**
 * @route GET /api/users/getSubcategory
 * @description Fetches all subcategories
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the list of subcategories or error details
 */
router.get("/getSubcategory", categoryController.getSubCategory);

/**
 * @route POST /api/users/createSubCategory
 * @description Creates a new subcategory
 * @access Private
 * @param {Object} req - Express request object containing subcategory data
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message and subcategory data or error details
 */
router.post("/createSubCategory", categoryController.createCategory);


/**
 * @route GET /api/users/getSubCategoryWithCategory
 * @description Fetches subcategories for a specific category
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the subcategories or error details
 */
router.get("/getSubCategoryWithCategory", categoryController.getSubCategoryWithCategory);


export default router;
