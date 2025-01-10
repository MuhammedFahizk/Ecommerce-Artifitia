import express from "express";
import productController from "../controllers/index.js";
import { requireAuthentication } from "../middleware/autchCheck.js";

const router = express.Router();

/**
 * @route POST /api/users/createProduct
 * @description Creates a new product
 * @access Private
 * @param {Object} req - Express request object containing product data
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the message and product data or error details
 */
router.post("/createProduct", productController.createProduct);

/**
 * @route POST /api/users/getAllProducts
 * @description Fetches all products
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the list of products or error details
 */
router.post("/getAllProducts", productController.getAllProducts);

/**
 * @route GET /api/users/product/:id
 * @description Fetch product details
 * @access Private
 * @param {string} id - Product ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object containing the product data
 */
router.get("/getProduct/:id", requireAuthentication, productController.getProductById);

/**
 * @route POST /api/addToCart/:productId
 * @description Adds a product to the user's cart
 * @access Private
 * @param {Object} req - Express request object containing the product ID
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the updated cart or error details
 */
router.post("/addToCart/:productId", requireAuthentication, productController.addToCart);



/**
 * @route PATCH /api/users/updateProduct
 * @description Partially updates an existing product
 * @access Private
 * @param {Object} req - Express request object with product data and optional files
 * @param {Object} res - Express response object for sending responses
 * @returns {Object} - Response object containing the updated product or error details
 */
router.patch("/updateProduct/:productId", productController.updateProduct);

export default router;
