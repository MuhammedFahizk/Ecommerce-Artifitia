import { createBrowserRouter } from "react-router-dom";
import {Login, NotFound, SignUp} from "../pages/Index.js";
import PublicRoutes from "../Utils/PublicRoutes.jsx";
import Home from "../pages/Home.jsx";
import CommonRoutes from "../Utils/CommonRoutes.jsx";

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
        // element: <PublicRoutes />,
        element: <CommonRoutes />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
    ]},
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
