import { createBrowserRouter } from "react-router-dom";
import {Login, NotFound, SignUp} from "../pages/Index.js";

export const routes = createBrowserRouter([
  {
    path: "/",
    children: [

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
