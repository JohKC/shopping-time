import { useEffect, useState } from "react";
import { Category } from "../../models/Category";
import { useLocation } from "react-router-dom";

export const useActiveCategory = () => {
  const [activeCategory, setActiveCategory] = useState<Category>();
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const name = pathArray[pathArray.length - 1];
    setActiveCategory({ name });
    document.title = `${name.charAt(0).toUpperCase() + name.slice(1)} | Shopping Time`;
  }, [location.pathname]);

  return { activeCategory };
};
