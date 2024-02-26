/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { NavLink } from "react-router-dom";
import { Category } from "../../models/Category";

interface CategoryMenuProps {
  allCategories: Category[];
  activeCategory?: Category;
  closeMenu: () => void;
}

const CategoryMenu = ({
  allCategories,
  activeCategory,
  closeMenu,
}: CategoryMenuProps) => {
  return (
    <ul>
      <NavLink
        to='/'
        onClick={() => {
          closeMenu();
        }}
        className='home-link'>
        <li>Home</li>
      </NavLink>
      {allCategories.map((category) => (
        <NavLink
          to={`/store/${category.name}`}
          key={category.name}
          className={
            activeCategory?.name === category.name
              ? "active-category-link"
              : "inactive-category-link"
          }>
          <li
            onClick={() => {
              closeMenu();
            }}>
            {category.name}
          </li>
        </NavLink>
      ))}
    </ul>
  );
};

export default CategoryMenu;
