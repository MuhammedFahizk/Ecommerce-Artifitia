import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Div } from "./Div";

export const Breadcrumb = () => {
  const location = useLocation();

  // Split the path into segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Div className="text-sm breadcrumbs">
      <ul className="flex gap-2">
        <li>
          <Link to="/" className="text-primary">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to}>
              {isLast ? (
                <span className="text-gray-500">{value}</span>
              ) : (
                <Link to={to} className="text-primary">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </Div>
  );
};
