import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import RecomendacoesCard from './RecomendacoesCard';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/DetalhesPaginas.css';
import { btn } from '../styles/login';

const copy = require('clipboard-copy');

function ReceitaComidaDetalhe({ props }) {
  const [favoriteFood, setFavoriteFood] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState();
  const history = useHistory();

  const { acctualyFood, foodRecomendation, id } = props;

  const shareClick = (e) => {
    e.preventDefault();
    const { location: { pathname } } = history;

    copy(`http://localhost:3000${pathname}`);
    setClipboardStatus('copied');
  };

  const favoriteClick = (e) => {
    e.preventDefault();

    return !favoriteFood ? setFavoriteFood(true) : setFavoriteFood(false);
  };

  const handleClick = (e) => {
    e.preventDefault();

    history.push(`/comidas/${id}/in-progress`);
  };

  const createRecipe = () => {
    if (acctualyFood) {
      const {
        strMeal,
        strCategory,
        strInstructions,
        strYoutube,
        strMealThumb,
      } = acctualyFood.meals[0];

      const foodRendering = acctualyFood.meals[0];

      const ingredients = [
        `${foodRendering.strIngredient1} ${foodRendering.strMeasure1}`,
        `${foodRendering.strIngredient2} ${foodRendering.strMeasure2}`,
        `${foodRendering.strIngredient3} ${foodRendering.strMeasure3}`,
        `${foodRendering.strIngredient4} ${foodRendering.strMeasure4}`,
        `${foodRendering.strIngredient5} ${foodRendering.strMeasure5}`,
        `${foodRendering.strIngredient6} ${foodRendering.strMeasure6}`,
        `${foodRendering.strIngredient7} ${foodRendering.strMeasure7}`,
        `${foodRendering.strIngredient8} ${foodRendering.strMeasure8}`,
        `${foodRendering.strIngredient9} ${foodRendering.strMeasure9}`,
        `${foodRendering.strIngredient10} ${foodRendering.strMeasure10}`,
        `${foodRendering.strIngredient11} ${foodRendering.strMeasure11}`,
        `${foodRendering.strIngredient12} ${foodRendering.strMeasure12}`,
        `${foodRendering.strIngredient13} ${foodRendering.strMeasure13}`,
      ];

      const linkLength = 32;
      const youtubeLink = strYoutube.substr(linkLength);

      return (
        <div className="recipe-container">
          <img
            alt="Produto"
            className="img-details-main"
            data-testid="recipe-photo"
            src={ strMealThumb }
          />

          <h2 data-testid="recipe-title">{ strMeal }</h2>

          <div>
            <button type="button" data-testid="share-btn" onClick={ shareClick }>
              <img alt="Share link" src={ shareIcon } />
            </button>
            <button type="button" onClick={ favoriteClick }>
              <img
                alt="Favorite button"
                data-testid="favorite-btn"
                src={ !favoriteFood ? whiteHeartIcon : blackHeartIcon }
              />
            </button>
          </div>

          {!clipboardStatus ? null : (<h5>Link copiado!</h5>)}

          <p data-testid="recipe-category">{ strCategory }</p>

          <ul>
            { ingredients.map((ingredient, index) => {
              if (ingredient !== null && ingredient !== ' ' && ingredient !== '  ') {
                return (
                  <li
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { ingredient }
                  </li>);
              }
              return null;
            })}
          </ul>

          <p data-testid="instructions">{ strInstructions }</p>

          <iframe data-testid="video" width="320" height="240" src={ `https://www.youtube.com/embed/${youtubeLink}` } title="YouTube video player" frameBorder="0" />

          <h3>Receitas Recomendadas:</h3>

          <div className="recomendation-container">

            { foodRecomendation.map((food, index) => {
              const cardLength = 5;
              if (index <= cardLength) {
                return (
                  <RecomendacoesCard
                    key={ food.idMeal }
                    props={ food }
                    type="meal"
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
            Start Recipe
            {/* foodRecipeStatus === 'start' ? 'Start recipe' : 'Continuar Receita'  */}
          </Button>
        </div>
      );
    }
    return null;
  };

  return createRecipe();
}

export default ReceitaComidaDetalhe;
