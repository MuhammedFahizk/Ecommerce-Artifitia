import { useState } from "react";
import { Div } from "../common/Index";
import { Headings } from "./Index";

export const Nav = ({setSideMenuIsExpand}) => {

  return (
    <Div className={"grid grid-cols-4 bg-primary h-[70px]"}>
      <Div></Div>
      <Div></Div>
      <Div></Div>
      <Headings setSideMenuIsExpand={setSideMenuIsExpand} />
    </Div>
  );
};
