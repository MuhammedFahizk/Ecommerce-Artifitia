import { useState } from "react";
import { VariantForm } from "./VariantForm";
import { Div } from "../common/Div";
import { Button } from "../common/Button";
import { Text } from "../common/Text";

export const Variant = ({ onChange, variantsData }) => {
  const [variants, setVariants] = useState([{ index: 0, data: {} }]);


  // Handle adding a new variant field
  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      { index: prev.length, data: { variantName: "", price: "", quantity: "" } },
    ]);
  };

  // Handle updating a variant's data when the input changes
  const handleVariantChange = (index, data) => {
    const updatedVariants = [...variants];
    updatedVariants[index].data = data;
    setVariants(updatedVariants);

    // Pass the updated variants back to the parent (AddProduct)
    onChange(updatedVariants);
  };

  return (
    <Div className="flex flex-col gap-4">
      <Div className={'flex '}>
      <Div className="w-1/3">
        <Text className={'text-gray-500'}>Variants : </Text>
      </Div> 
    <Div className={' flex flex-col gap-2'}>
    {variants.map((variant, index) => (
        <VariantForm
        variantsData={variantsData? variantsData[index]: null}
          key={index}
          index={index}
          onChange={handleVariantChange}
        />
      ))}
    </Div>
      </Div>
      {/* Align button to the right */}
      <Button
        onClick={handleAddVariant} 
        className="bg-[#3C3C3C] text-white w-fit ms-auto rounded-xl p-2 mt-2"
      >
        Add Variant
      </Button>
    </Div>
  );
};
