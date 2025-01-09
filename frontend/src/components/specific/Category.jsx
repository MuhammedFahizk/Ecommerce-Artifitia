import React, { useEffect, useState } from "react";
import { Div, Text } from "../common/Index";
import { getCategory, getSubCategoryWithCategory } from "../../services/getApi";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export const Category = ({
  selectedSubCategories,
  setSelectedSubCategories,
  pagination,
  setPagination,
}) => {
  const [categories, setCategories] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [subCategories, setSubCategories] = useState({});

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

  const handleCheckboxChange = (subCategoryId) => {
    setSelectedSubCategories((prev) => {
      if (prev.includes(subCategoryId)) {
        return prev.filter((id) => id !== subCategoryId); // Remove the ID
      } else {
        return [...prev, subCategoryId]; // Add the ID
      }
    });
  };

  const handleTextClick = (subCategoryId) => {
    // Trigger the same action as checkbox click
    handleCheckboxChange(subCategoryId);
  };

  const clearAllSelections = () => {
    setSelectedSubCategories([]); // Clear all selected subcategories
  };

  return (
    <Div className={"space-y-2 items-center w-full px-4"}>
      <Text className={"text-primary text-lg font-bold"}>Categories</Text>

      <Div>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Div key={category._id} className="py-2">
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
                  {subCategories[category._id] ? (
                    subCategories[category._id].map((subCategory) => (
                      <Div key={subCategory._id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedSubCategories.includes(subCategory._id)} // Check if ID is selected
                          onChange={() => handleCheckboxChange(subCategory._id)} // Handle selection by ID
                        />
                        <Text 
                          onClick={() => handleTextClick(subCategory._id)} // Handle text click as well
                          className="cursor-pointer"
                        >
                          {subCategory.name}
                        </Text>
                      </Div>
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

      {/* Clear All Button */}
      <Div className="mt-4  text-end ">
        <button
          onClick={clearAllSelections}
          className=" text-red-400 text-xs font-semibold px-4 py-1 rounded"
        >
          Clear All
        </button>
      </Div>
    </Div>
  );
};
