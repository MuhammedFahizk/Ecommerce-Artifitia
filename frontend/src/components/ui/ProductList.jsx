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

  return (
    <Div className={"grid grid-cols-5 px-10"}>
      <Category />
      <Products pagination={pagination} setPagination={setPagination} />
    </Div>
  );
};
