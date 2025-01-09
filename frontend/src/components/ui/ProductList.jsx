import { Div } from "../common/Index";
import { Category, Products } from "../specific/Index";

export const ProductList = () => {
  return <Div className={"grid grid-cols-5 px-10"}>
    <Category/>
    <Products/>
    
  </Div>;
};
