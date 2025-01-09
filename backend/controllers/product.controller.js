import product from "../models/product.js";
import cloudinary from "cloudinary";
import { uploadImageCloudinary } from "../service/uploadImageCloudinary.js";
import CustomError from "../config/errors/CustomError.js";
import { ObjectId } from "mongoose";
import { User } from "../models/UserSchema.js";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createProduct = async (req, res) => {
  try {
    const { productName, subCategory, description, variants } = req.body;

    const processedVariants = JSON.parse(variants);
    console.log(variants, processedVariants);

    console.log(req.body, req.files);
    const imageUrls = [];
    if (req.files) {
      for (const key in req.files) {
        const file = req.files[key];
        const uploadResult = await uploadImageCloudinary(file);
        imageUrls.push({ url: uploadResult.secure_url });
      }
    }

    console.log(imageUrls);

    const newProduct = new product({
      productName,
      subCategory,
      description,
      variants: processedVariants,
      images: imageUrls,
    });

    await newProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the product",
    });
  }
};

/**
 * Fetch All Products with Pagination, Sorting, and Searching
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getAllProducts = async (req, res) => {
  try {
    const { userId } = req;
    const { page = 1, limit = 10, subCategory, search = "" } = req.body;

    const skip = (page - 1) * limit;

    const filters = {};

    if (search) {
      filters.productName = { $regex: search, $options: "i" };
    }

    if (subCategory) {
      filters.subCategory = subCategory;
    }

    const products = await product
      .find(filters)
      .populate("subCategory", "name")
      .skip(skip)
      .limit(Number(limit));

    const totalProducts = await product.countDocuments(filters);

    const user = await User.findById(userId);
    const userCart = user ? user.cart : [];

    const pagination = {
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      limit,
    };

    console.log(pagination);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: { products, cart: userCart, pagination },
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching products",
    });
  }
};

/**
 * Controller to fetch a product by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Product data or error message
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log();

    // Find the product by ID
    const productDtl = await product.findById(id).populate("subCategory");

    // If product is not found, return a 404 error
    if (!productDtl) {
      throw new CustomError("Product Not Found .", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: productDtl,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching the product",
    });
  }
};

/**
 * @route POST /api/addToCart/:productId
 * @description Adds a product to the user's cart
 * @access Private
 */
export const addToCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      CustomError("User not found. Please login to add products to cart", 404);
    }

    const productIndex = user.cart?.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      user.cart[productIndex].quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
