import { createBrowserRouter } from "react-router-dom";
import {Login, NotFound, ProductDetails, SignUp} from "../pages/Index.js";
import PublicRoutes from "../Utils/PublicRoutes.jsx";
import Home from "../pages/Home.jsx";
import ProtectedRoutes from "../Utils/ProtectedRoutes.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    children: [

      {
        path: "/",
        element: <PublicRoutes />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signUp",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/product/:id",
            element: <ProductDetails />,
          },
    ]},
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
