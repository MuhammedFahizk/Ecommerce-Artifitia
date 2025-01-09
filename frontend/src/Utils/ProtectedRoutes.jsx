import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Nav, SideBar } from "../components/layout/Index";
import { useState } from "react";
import { Div } from "../components/common/Div";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(false );
  const [cartCount, setCartCount] = useState(0)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Div className={"relative"}>
      <Div className={"absolute top-0 left-0 w-full h-screen bg-white z-10"}>
        <Nav cartCount={cartCount} setSideMenuIsExpand={setSideMenuIsExpand}  />
        <Outlet />
      </Div>
     {
      sideMenuIsExpand ? ( 
        <SideBar  cartCount={cartCount} setCartCount={setCartCount}  setSideMenuIsExpand={setSideMenuIsExpand} />
      ) : (
        <></>
      )
     }
    </Div>
  );
};

export default ProtectedRoutes;
