import React, { useState } from "react";
import { Div } from "../common/Index";
import { Category, Products } from "../specific/Index";

export const ProductList = () => {
  const [pagination, setPagination] = useState({
    limit: 10,
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
   
  });

  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  return (
    <Div className={"grid grid-cols-5 px-10"}>
      <Category
        pagination={pagination}
        setPagination={setPagination}
        selectedSubCategories={selectedSubCategories} 
        setSelectedSubCategories={setSelectedSubCategories}
      />
      <Products
        pagination={pagination}
        setPagination={setPagination}
        selectedSubCategories={selectedSubCategories} 
      />
    </Div>
  );
};
