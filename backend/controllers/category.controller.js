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




export const getSubCategoryWithCategory = async (req, res) => {
  try {
    const { categoryId } = req.query; // Get the category ID from query parameters

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    // Find subcategories where the parent matches the category ID
    const subCategories = await Category.find({ parent: categoryId });

    if (subCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found for the given category",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: subCategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while fetching subcategories",
    });
  }
};


