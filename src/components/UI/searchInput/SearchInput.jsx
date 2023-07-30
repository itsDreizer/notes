import React from "react";

import "./SearchInput.scss";

const SearchInput = ({ className, ...props }) => {
  return <input {...props} className={`search-input ${className}`} type="text" />;
};

export default SearchInput;
