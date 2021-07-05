import React, { useState } from 'react';
import ButtonsRecipesMade from '../../components/ButtonsRecipesMade';
import CardRecipesMade from '../../components/CardRecipesMade';
import recipes from './mockLocalStorage';
import './style.css';

export default function RecipesMade() {
  const storage = localStorage.getItem('doneRecipes');
  const doneRecipes = storage ? JSON.parse(storage) : recipes;

  const [filterRecipes, setFilterRecipes] = useState(doneRecipes);

  if (filterRecipes.length === 0) {
    return 'loading';
  }

  // function filterDoneRecipes(buttonName) {
  //   if (buttonName === 'Foods') {
  //     const filteredFoods = doneRecipes.filter(({ type }) => (
  //       type !== 'bebida'
  //     ));
  //     setFilterRecipes(filteredFoods);
  //   }
  //   if (buttonName === '') {
  //   }
  // }

  function filterFoodsRecipes() {
    const filteredFoods = doneRecipes.filter(({ type }) => (
      type !== 'bebida'
    ));
    setFilterRecipes(filteredFoods);
  }

  function filterDrinksRecipes() {
    const filteredFoods = doneRecipes.filter(({ type }) => (
      type !== 'comida'
    ));
    setFilterRecipes(filteredFoods);
  }

  function allRecipes() {
    setFilterRecipes(doneRecipes);
  }

  return (
    <>
      <h2>receitas feitas</h2>
      <section className="recipes-made-container">
        <ButtonsRecipesMade
          filterFoodRecipes={ filterFoodsRecipes }
          filterDrinksRecipes={ filterDrinksRecipes }
          allRecipes={ allRecipes }
        />
        {filterRecipes.map((recipe, index) => (
          <CardRecipesMade
            key={ recipe.id }
            index={ index }
            image={ recipe.image }
            id={ recipe.id }
            area={ recipe.area }
            category={ recipe.category }
            name={ recipe.name }
            doneDate={ recipe.doneDate }
            tags={ recipe.tags }
            type={ recipe.type }
            alcoholicOrNot={ recipe.alcoholicOrNot }
          />
        ))}
      </section>
    </>
  );
}
