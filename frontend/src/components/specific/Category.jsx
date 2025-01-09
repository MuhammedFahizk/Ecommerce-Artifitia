import React, { useEffect, useState } from "react";
import { Div, Text } from "../common/Index";
import { getCategory, getSubCategoryWithCategory } from "../../services/getApi";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export const Category = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [expandedIndex, setExpandedIndex] = useState(null); // State to track expanded category
  const [subCategories, setSubCategories] = useState({}); // State to store subcategories for each category

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await getSubCategoryWithCategory(categoryId); // Pass categoryId to the API
      setSubCategories((prev) => ({ ...prev, [categoryId]: response.data })); // Use categoryId as the key
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const toggleCategory = (index, categoryId) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse the category
    } else {
      setExpandedIndex(index);
      if (!subCategories[categoryId]) {
        fetchSubCategories(categoryId);
      }
    }
  };

  return (
    <Div className={"space-y-2 items-center w-full px-4"}>
      <Text className={"text-primary text-lg font-bold"}>Categories</Text>

      <Div>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Div key={index} className="py-2">
              {/* Category Header */}
              <Div
                onClick={() => toggleCategory(index, category._id)} // Pass category._id
                className="flex justify-between items-center cursor-pointer"
              >
                <Text className={"text-md font-semibold"}>{category.name}</Text>
                {expandedIndex === index ? (
                  <IoIosArrowDown className="text-primary" />
                ) : (
                  <IoIosArrowForward className="text-primary" />
                )}
              </Div>

              {expandedIndex === index && (
                <Div className="pl-4 mt-2 text-secondary text-sm">
                  {subCategories[category._id] ?(
                    subCategories[category._id].map((subCategory, i) => (
                      <Text key={i}>{subCategory.name}</Text> 
                    ))
                  ) : (
                    <Text>Loading...</Text>
                  )}
                </Div>
              )}
            </Div>
          ))
        ) : (
          <Text className={"text-secondary"}>No categories found</Text>
        )}
      </Div>
    </Div>
  );
};
