import { useState } from "react";
import { Breadcrumb, Button, Div, Modal } from "../components/common/Index";
import { AddCategory, AddProduct, AddSubCategory } from "../components/ui/Index";

const Home = () => {
  const [activeModal, setActiveModal] = useState(null);

  const modalData = [
    { type: "category", label: "Add Category", Component: AddCategory },
    { type: "subCategory", label: "Add Sub Category", Component: AddSubCategory },
    { type: "product", label: "Add Product", Component: AddProduct },
  ];

  return (
    <Div>
      <Div className="flex justify-between px-20 h-[80px] items-center">
        <Breadcrumb />
        <Div className="flex me-10 gap-4 text-white">
          {modalData.map(({ type, label }) => (
            <Button
              key={type}
              className="bg-secondary rounded-xl p-2 px-5"
              onClick={() => setActiveModal(type)}
            >
              {label}
            </Button>
          ))}
        </Div>
      </Div>

      {modalData.map(({ type, Component }) => (
        <Modal key={type} isOpen={activeModal === type} onClose={() => setActiveModal(null)} width={type === 'product' ? 'max-w-2xl' : undefined} 
        >
          <Component closeModal={() =>  setActiveModal(null)} />
        </Modal>
      ))}
    </Div>
  );
};

export default Home;
