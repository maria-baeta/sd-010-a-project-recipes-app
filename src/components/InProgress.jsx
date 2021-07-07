import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

if (!localStorage.getItem('favoriteRecipes')) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

const kindOf = (history) => {
  if (history.location.pathname.includes('bebidas')) return 'Drink';
  if (history.location.pathname.includes('comidas')) return 'Meal';
};

const objectKind = (history) => {
  if (history.location.pathname.includes('bebidas')) return 'cocktails';
  if (history.location.pathname.includes('comidas')) return 'meals';
};

const setCheckArr = (id, objkey) => {
  const inProg = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProg[objkey][id]) return (inProg[objkey][id]);
  const myStorage = { ...inProg, [objkey]: { ...inProg[objkey], [id]: [] } };
  localStorage.setItem('inProgressRecipes', JSON.stringify(myStorage));
  return [''];
};

function InProgress({ recipe, history, id }) {
  const kind = kindOf(history);
  const objectKey = objectKind(history);
  const checkedArr = setCheckArr(id, objectKey);
  const ingredientKeys = Object.keys(recipe).filter((e) => e.includes('strIngredient'))
    .filter((e) => recipe[e] !== '' && recipe[e] !== null);

  const [heart, setHeart] = useState(false);

  function handleChange(event) {
    const isChecked = event.target.checked;
    const myId = event.target.id;
    const myLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isChecked) {
      const newLocalStorage = {
        ...myLocalStorage,
        [objectKey]: {
          ...myLocalStorage[objectKey],
          [id]: myLocalStorage[objectKey][id].concat(myId),
        } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
    } else {
      const newLocalStorage = {
        ...myLocalStorage,
        [objectKey]: {
          ...myLocalStorage[objectKey],
          [id]: myLocalStorage[objectKey][id].filter((e) => e !== myId),
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
    }
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt={ `${kind}` }
        src={ recipe[`str${kind}Thumb`] }
        className="sectionImg"
      />
      <h1 data-testid="recipe-title">{ recipe[`str${kind}`] }</h1>
      <button type="button" data-testid="share-btn">
        <img
          src={ shareIcon }
          alt="share icon"
        />
      </button>
      <button
        type="button"
        onClick={ () => setHeart(!heart) }
        data-testid="favorite-btn"
      >
        <img
          src={ heart ? blackHeart : whiteHeart }
          alt="fav icon"
        />
      </button>
      <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
      { ingredientKeys.map((k, index) => (
        <div key={ k }>
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ index }
          >
            <input
              defaultChecked={ checkedArr.includes(`${index}`) }
              type="checkbox"
              name="ingredients"
              id={ index }
              onChange={ (e) => handleChange(e) }
            />
            { `${recipe[k]} ${recipe[`strMeasure${index + 1}`]}` }
          </label>
          <br />
        </div>
      ))}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

InProgress.propTypes = {
  recipe: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
};

export default InProgress;
