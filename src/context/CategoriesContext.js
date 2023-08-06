import React, { createContext, useState } from "react";
import { FireBase } from "../API/firebase";
import useFetching from "../hooks/useFetching";

export const CategoriesContext = createContext(null);

const CategoriesProvider = ({ children }) => {
  const [allCategories, setAllCategories] = useState([]);

  const [fetchCategories, isCategoriesLoading, isFetchingCategoriesError] = useFetching(async () => {
    const { categories } = await FireBase.getCategories();
    setAllCategories([...categories]);
  });

  const values = {
    allCategories,
    setAllCategories,
    fetchCategories,
    isCategoriesLoading,
    isFetchingCategoriesError,
  };

  return <CategoriesContext.Provider value={values}>{children}</CategoriesContext.Provider>;
};

export default CategoriesProvider;
