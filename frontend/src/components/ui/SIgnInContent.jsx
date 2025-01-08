import { Link } from "react-router-dom";
import { Button, Div, Text } from "../common/Index";

export const SIgnInContent = () => {
  return (
    <Div className={'col-span-3 bg-primary min-h-screen flex justify-center items-center px-10 '}>

    <Div className={'text-white flex flex-col   justify-center space-y-8 items-center px-14 h-fit'}>
      <Text tag={'h1'} className={'text-4xl font-bold' }>
      Hello Friend!
      </Text>
      <Text tag={'p'} className={'text-xl text-center '}>
      Enter your personal details and start your journey with us
      </Text>
     <Link
     to="/sign-up"
     >
     <Button className={' rounded-full text-2xl border px-10 p-2'}>
        Sign Up
      </Button>
     </Link>
    </Div>
    </Div>
  );
};
