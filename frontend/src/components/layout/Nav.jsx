import { useState } from "react";
import { Button, Div } from "../common/Index";
import { Headings } from "./Index";
import { useDispatch } from "react-redux";
import { setSearch } from "../../Redux/feathers/auth"; // Ensure the action is imported
import { SlClose } from "react-icons/sl";

export const Nav = ({ setSideMenuIsExpand, cartCount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    // Dispatch the search term to Redux
    dispatch(setSearch(searchTerm));
  };

  const handleClear = () => {
    // Clear the search input and dispatch an empty search term to Redux
    setSearchTerm("");
    dispatch(setSearch(""));
  };

  return (
    <Div className={"grid grid-cols-4 bg-primary h-[70px]"}>
      <Div></Div>
      <Div className={"flex justify-center items-center h-full"}>
        <input
          className="w-[200px] rounded-s-2xl h-[40px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          placeholder="Search products"
        />
         {searchTerm && (
          <Button
            className={" w-12 rounded-xl -ms-12 h-[40px]"} // Adjust style for the clear button
            onClick={handleClear}
          >
            <SlClose className="text-xl "/>
          </Button>
        )}
        <Button
          className={"bg-secondary w-20 rounded-xl -ms-3 h-[40px]"}
          onClick={handleSearch}
        >
          Search
        </Button>
       
      </Div>
      <Div></Div>
      <Headings cartCount={cartCount} setSideMenuIsExpand={setSideMenuIsExpand} />
    </Div>
  );
};
