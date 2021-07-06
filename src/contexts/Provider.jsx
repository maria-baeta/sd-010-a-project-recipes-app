import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchMeals from '../services/fetchMeals';

function Provider({ children }) {
  const initialMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const initialDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [meals, setMeals] = useState(['', '']);
  const [drinks, setDrinks] = useState(['', '']);
  const [mealsUrl, setMealsUrl] = useState(initialMealsUrl);
  const [drinksUrl, setDrinksUrl] = useState(initialDrinksUrl);
  const [userPage, setUserPage] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    const getMeals = async () => {
      const quantity = 12;
      const mealsResponse = await fetchMeals(mealsUrl);
      if (!mealsResponse.meals) {
        setNoResultsFound(true);
        return;
      }
      const twelveMeals = mealsResponse.meals.filter((_meal, index) => index < quantity);
      setMeals(twelveMeals);
    };
    getMeals();
  }, [mealsUrl]);

  useEffect(() => {
    const getDrinks = async () => {
      const quantity = 12;
      const drinksResponse = await fetchMeals(drinksUrl);
      if (!drinksResponse.drinks) {
        setNoResultsFound(true);
        return;
      }
      const twelveDrinks = drinksResponse.drinks.filter((_drink, index) => (
        index < quantity));

      setDrinks(twelveDrinks);
    };

    getDrinks();
  }, [drinksUrl]);

  return (
    <MyContext.Provider
      value={
        {
          meals,
          setMealsUrl,
          drinks,
          setDrinksUrl,
          userPage,
          setUserPage,
          noResultsFound,
          setNoResultsFound,
          recipe,
          setRecipe }
      }
    >
      { children }
    </MyContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
