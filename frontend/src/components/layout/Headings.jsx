import { Div, Text } from "../common/Index";
import { CiShoppingCart } from "react-icons/ci";

export const Headings = ({ setSideMenuIsExpand }) => {
  return (
    <Div className={"text-white flex items-center"}>
      <Div
        className={"cursor-pointer w-fit "}
        onClick={() => setSideMenuIsExpand(true)}
      >
        <Text
          tag={"p"}
          className={"flex text-sm  w-full h-fit items-center gap-1"}
        >
          <CiShoppingCart className="text-xl" /> cart
        </Text>
      </Div>
    </Div>
  );
};
