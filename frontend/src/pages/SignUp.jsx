import React from "react";
import { Div } from "../components/common/Index";
import { BgSign, SignUpUi } from "../components/ui/Index";

export const SignUp = () => {
  return (
    <Div className={"grid grid-cols-8"}>
      <BgSign/>
      <SignUpUi/>
    </Div>
  );
};
