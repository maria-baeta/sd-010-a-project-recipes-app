import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RecomendacoesCard from '../components/RecomendacoesCard';

import { getDrinkByID } from '../services/fetchApiDetailsRecipe';
import { getFoodRecomendation } from '../services/fetchApiRecomendations';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/DetalhesPaginas.css';
import { btn } from '../styles/login';

const copy = require('clipboard-copy');

function DetalhesBebida({ match: { params: { id } } }) {
  const [acctualyDrink, setAcctualyDrink] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [drinkRecomendation, setDrinkRecomendation] = useState();
  const [clipboardStatus, setClipboardStatus] = useState();
  const history = useHistory();

  useEffect(() => {
    async function fetchDrink() {
      setIsLoading(true);
      const drink = await getDrinkByID(id);
      const recomendations = await getFoodRecomendation();

      setDrinkRecomendation(recomendations.meals);
      setAcctualyDrink(drink);
      setIsLoading(false);
    }

    fetchDrink();
  }, [id]);

  const shareClick = (e) => {
    e.preventDefault();
    const { location: { pathname } } = history;

    copy(`http://localhost:3000${pathname}`);
    setClipboardStatus('copied');
  };

  const handleClick = (e) => {
    e.preventDefault();

    history.push(`/bebidas/${id}/in-progress`);
  };

  const createRecipe = () => {
    if (acctualyDrink) {
      const {
        strDrink,
        strAlcoholic,
        strCategory,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strDrinkThumb,
      } = acctualyDrink.drinks[0];

      const ingredients = [
        `${strIngredient1} ${strMeasure1}`,
        `${strIngredient2} ${strMeasure2}`,
        `${strIngredient3} ${strMeasure3}`,
        `${strIngredient4} ${strMeasure4}`,
        `${strIngredient5} ${strMeasure5}`,
        `${strIngredient6} ${strMeasure6}`,
        `${strIngredient7} ${strMeasure7}`,
        `${strIngredient8} ${strMeasure8}`,
        `${strIngredient9} ${strMeasure9}`,
        `${strIngredient10} ${strMeasure10}`,
        `${strIngredient11} ${strMeasure11}`,
        `${strIngredient12} ${strMeasure12}`,
        `${strIngredient13} ${strMeasure13}`,
      ];
      console.log('Recomendação de Drinks', drinkRecomendation);

      return (
        <div className="recipe-container">
          <img
            alt="Produto"
            className="img-details-main"
            data-testid="recipe-photo"
            src={ strDrinkThumb }
          />

          <h2 data-testid="recipe-title">{ strDrink }</h2>

          <div>
            <button type="button" data-testid="share-btn" onClick={ shareClick }>
              <img alt="Share link" src={ shareIcon } />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img alt="Favorite button" src={ whiteHeartIcon } />
            </button>
          </div>

          {!clipboardStatus ? null : (<h5>Link copiado!</h5>)}

          <p data-testid="recipe-category">{ `${strCategory} - ${strAlcoholic}` }</p>

          <ul>
            { ingredients.map((igredient, index) => (
              <li
                key={ igredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { igredient }
              </li>))}
          </ul>

          <p data-testid="instructions">{ strInstructions }</p>

          <h3>Receitas Recomendadas:</h3>

          <div className="recomendation-container">

            { drinkRecomendation.map((drink, index) => {
              const cardLength = 5;
              if (index <= cardLength) {
                return (
                  <RecomendacoesCard
                    key={ drink.idDrink }
                    props={ drink }
                    type="drink"
                    index={ index }
                  />
                );
              }
              return null;
            }) }
          </div>

          <Button
            variant="success"
            type="button"
            onClick={ handleClick }
            data-testid="start-recipe-btn"
            className={ `${btn} button-recipe` }
          >
            Start recipe
          </Button>
        </div>
      );
    }
    return null;
  };

  return !isLoading ? createRecipe() : <span>Loading...</span>;
}

DetalhesBebida.propTypes = {
  props: object,
}.isRequired;

export default DetalhesBebida;
