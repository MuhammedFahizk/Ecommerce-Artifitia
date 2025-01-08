import { useState } from "react";
import { Div, Text } from "../common/Index";

export const VariantForm = ({ index, onChange }) => {
  const [variantData, setVariantData] = useState({
    ram: "",
    price: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVariantData((prev) => ({
      ...prev,
      [name]: value,
    }));
    onChange(index, variantData); // Send the updated variant data to the parent
  };

  return (
    <div className="flex gap-4 items-center ">
      {/* Label for Variant Name */}
      {/* <Div className="w-1/3">
        <Text className={'text-gray-500'}>Variants : </Text>
      </Div> */}

      <Div className="w-full flex justify-between items-center gap-4">
      <Div className="flex  items-center h-full gap-2">
      <label htmlFor="ram" className="text-sm">Ram:</label>
          <input
            type="text"
            name="ram"
            id="ram"
            value={variantData.ram}
            placeholder=" ram"
            onChange={handleInputChange}
            className="input w-28 p-2 border border-gray-300 rounded"
          />
        </Div>

        <Div className="flex  items-center h-full gap-2">
          <label htmlFor="price" className="text-sm">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={variantData.price}
            placeholder="Price"
            onChange={handleInputChange}
            className="input w-24 p-2 border border-gray-300 rounded"
          />
        </Div>

        <Div className="flex  items-center h-full gap-2">
          <label htmlFor="quantity" className="text-sm">Quantity:</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={variantData.quantity}
            placeholder="Quantity"
            onChange={handleInputChange}
            className="input w-24 p-2 border border-gray-300  rounded-lg"
          />
        </Div>
      </Div>
    </div>
  );
};
