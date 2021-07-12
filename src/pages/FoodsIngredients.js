import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import RecipesContext from '../contexts/RecipesContext';
import SearchbarContext from '../contexts/SearchbarContext';

function FoodsIngredients() {
  const {
    ingredients, setIngredients, setMealsAndDrinkByIngredients,
  } = useContext(RecipesContext);
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);
  const TWELVE = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setIngredients(meals);
    };
    getIngredients();
    setHideSearchBtn(false);
    setPageName('Explorar Ingredientes');
  }, []);

  const getIngredients = () => {
    const getRecipesByIngredients = async (param) => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`;
      const { meals } = await fetch(endpoint).then((data) => data.json());
      console.log(meals);
      setMealsAndDrinkByIngredients(meals.slice(0, TWELVE));
    };

    const twelveIngredients = ingredients
      .filter((ingredient, index) => index < TWELVE);
    return (
      twelveIngredients.map((eachIngredient, index) => {
        const name = eachIngredient.strIngredient;
        return (
          <div data-testid={ `${index}-ingredient-card` } key={ index }>
            <Link
              to="/comidas"
              onClick={
                (e) => getRecipesByIngredients(e.target.alt || e.target.innerText)
              }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` }
                alt={ name }
              />
              <p
                value={ name }
                data-testid={ `${index}-card-name` }
              >
                { name }
              </p>
            </Link>
          </div>
        );
      })
    );
  };

  return (
    <>
      <Header />
      { getIngredients() }
      <Footer />
    </>
  );
}

export default FoodsIngredients;
