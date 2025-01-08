import { Div, Text } from "../common/Index"
import { CiShoppingCart } from "react-icons/ci";

export const Headings = () => {
  return (
    <Div className={'text-white flex items-center'}>
           <Text tag={'p' } className={'flex text-sm  w-full h-fit items-center gap-1'}>


        </Text>
        <Text tag={'p' } className={'flex text-sm  w-full h-fit items-center gap-1'}>
        <CiShoppingCart/> cart
        </Text>
    </Div>
  )
}
