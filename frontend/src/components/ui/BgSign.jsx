import { Link } from "react-router-dom";
import { Button, Div, Text } from "../common/Index";
export const BgSign = () => {
  return (
    <Div className={'col-span-3 bg-primary min-h-screen flex justify-center items-center px-10 '}>

    <Div className={'text-white flex flex-col   justify-center space-y-8 items-center px-14 h-fit'}>
      <Text tag={'h1'} className={'text-4xl font-bold' }>
      Welcome Back!
      </Text>
      <Text tag={'p'} className={'text-xl text-center '}>
      To keep connected with us plase login with your personal info
      </Text>
     <Link
     to="/login"
     >
     <Button className={' rounded-full text-2xl border px-10 p-2'}>
        Sign In
      </Button>
     </Link>
    </Div>
    </Div>
  )
}
