import CustomError from "../config/errors/CustomError.js";
import Category from "../models/category.js";
import product from "../models/product.js";

export const createCategory = async (req, res) => {
  try {
    const data = req.body;
    const existingCategory = await Category.findOne({ name: data.name });

    if (existingCategory) {
      throw new CustomError("Category with this name already exists.", 409);
    }

    const createdCategory = await Category.create(data);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: createdCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);

    return res.status(500).json({
      success: false,
      message: error || "An error occurred while creating the category",
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({ parent: null });

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching categories",
    });
  }
};

export const getSubCategory = async (req, res) => {
  try {
    const categories = await Category.find({ parent: { $ne: null } });

    return res.status(200).json({
      success: true,
      message: "Sub Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching  Sub categories:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while fetching Sub categories",
    });
  }
};

export const createProduct = async (req, res) => {
    try {
      const { productName, subCategory, description, variants } = req.body.data;
        
      const processedVariants = variants.map((variant) => variant.data);
      console.log(req.files);
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ success: false, message: "No files were uploaded." });
      }z
      const newProduct = new product({
        productName,
        subCategory,
        description,
        variants: processedVariants,
        // images: imageUrls, // Uncomment and process image uploads as needed
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
  