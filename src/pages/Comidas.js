import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ALL_MEALS_ENDPOINT,
  MEALS_BY_CATEGORY_ENDPOINT } from '../services/meals';
import { getFoodCategoriesAPIThunk,
  getFoodRecipesAPIThunk } from '../redux/actions/mealsAction';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import MealsCategoryButtons from '../components/MealsCategoryButtons';
import MealsCards from '../components/MealsCards';

const pickEndpoint = (category) => {
  switch (category) {
  case 'All':
    return ALL_MEALS_ENDPOINT;
  default:
    return MEALS_BY_CATEGORY_ENDPOINT(category);
  }
};

function Comidas() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.meals.selectedCategory);
  useEffect(() => {
    dispatch(getFoodCategoriesAPIThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFoodRecipesAPIThunk(pickEndpoint(selectedCategory)));
  }, [dispatch, selectedCategory]);
  const loadingRecipes = useSelector((state) => state.loading.loadingRecipes);
  const loadingCategories = useSelector((state) => state.loading.loadingCategories);
  const meals = useSelector((state) => state.meals.recipes);
  return (
    <section>
      <Header title="Comidas" />
      {loadingCategories ? <Loading /> : <MealsCategoryButtons />}
      {loadingRecipes ? <Loading /> : <MealsCards meals={ meals } />}
      <footer>
        <Footer />
      </footer>
    </section>
  );
}

export default Comidas;
