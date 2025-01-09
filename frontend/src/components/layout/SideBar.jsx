import React, { useEffect, useState } from "react";
import { Div } from "../common/Div";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "../common/Button";
import { CiHeart } from "react-icons/ci";
import { Text } from "../common/Text";
import { getCartsItems } from "../../services/getApi"; // Make sure this function exists
import { SlClose } from "react-icons/sl";

export const SideBar = ({ setSideMenuIsExpand }) => {
  const [cartItems, setCartItems] = useState([]); // State to hold cart items

  // Fetch cart items when component mounts or sidebar is opened
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartsItems();

        if (response && response.data) {
          setCartItems(response.data.cart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array to run once when the component mounts
  console.log(cartItems);

  return (
    <Div
      className={"w-full absolute bg-[#0000005b] h-screen z-40"}
      animateProps={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
      }}
    >
      {/* Sidebar */}
      <Div
        className={"absolute top-0 right-0 h-full bg-white shadow-lg z-50"}
        style={{ width: "300px" }}
        animateProps={{
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
          transition: { duration: 0.5 },
        }}
      >
        <Div
          className={
            "bg-primary w-full h-[70px] px-5 justify-between text-white items-center flex"
          }
        >
          <Div className={"flex gap-3 justify-center items-center h-fit"}>
            <Button className={" bg-btn  rounded-full  p-2 "}>
              <CiHeart className="text-xl text-black" />
            </Button>
            <Text className={"text-xl"}>Items</Text>
          </Div>
          <Button onClick={() => setSideMenuIsExpand(false)}>
            <IoIosArrowForward className="text-xl" />
          </Button>
        </Div>

        <div className="p-4">
          <div className="space-y-4 mt-2">
            {cartItems.length === 0 ? (
              <Text>No items in the cart</Text>
            ) : (
              cartItems.map((item) => (
                <Div
                  key={item._id}
                  className="flex items-center border-b p-2 justify-between px-4"
                >
                  <Div className={" rounded-lg border  "}>
                    <img
                      src={item?.product.images[0]?.url}
                      alt={item.name}
                      className="w-24 h-
                        14 object-cover rounded-full"
                    />
                  </Div>
                  <Div className={""}>
                    <Text className={'text-primary font-semibold '}>{item.product.productName}</Text>
                    <Text className={'text-sm'}> ${item.product?.variants[0]?.price}</Text>
                  </Div>
                  <Button>
                    <SlClose className="text-xl" />
                  </Button>
               
                </Div>
              ))
            )}
          </div>
        </div>
      </Div>
    </Div>
  );
};
