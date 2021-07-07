import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchbarContext from './SearchbarContext';

function SearchbarProvider({ children }) {
  // const [mealOrDrink, setMealOrDrink] = useState(null);
  // const [recipes, setRecipes] = useState([]);
  // const [idMeal, setIdMeal] = useState();
  // const [idDrink, setIdDrink] = useState();
  const [searchBtn, setSearchBtn] = useState(false);
  const [hideSearchBtn, setHideSearchBtn] = useState(false);
  const [pageName, setPageName] = useState('Comida');
  // const [mealOrDrink, setMealOrDrink] = useState('meal');
  const [searchCategory, setSearchCategory] = useState('list');
  const [categories, setCategories] = useState();
  // const [] = useState();

  const contextValue = {
    // mealOrDrink,
    // setMealOrDrink,
    // recipes,
    // setRecipes,
    // idDrink,
    // setIdDrink,
    // idMeal,
    // setIdMeal,
    searchBtn,
    setSearchBtn,
    hideSearchBtn,
    setHideSearchBtn,
    pageName,
    setPageName,
    searchCategory,
    setSearchCategory,
    categories,
    setCategories,
  };

  return (
    <SearchbarContext.Provider value={ contextValue }>
      {children}
    </SearchbarContext.Provider>
  );
}

SearchbarProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default SearchbarProvider;
