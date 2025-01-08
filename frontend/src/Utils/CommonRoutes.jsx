import { Outlet } from "react-router-dom"
import {Div} from "../components/common/Index"
import { Nav } from "../components/layout/Nav"
// import NavBar from "../layout/NavBar"

const CommonRoutes = () => {
  return (
    <Div className={"   h-screen  "}>
      <Nav/>
    <Outlet />
  </Div>
  )
}

export default CommonRoutes