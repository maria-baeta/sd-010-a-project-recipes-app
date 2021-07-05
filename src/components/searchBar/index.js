import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import {
  fetchByIngredientApi,
  fetchByNameApi,
  fetchByFirstLetterApi,
} from '../../services/fetchApiRadio';

export default function SearchBar() {
  const { context } = useContext(AppContext);
  const {
    setSearchValue,
    inputValue,
    setInputValue,
    pageOrigin,
    searchValue,
    setRecipesList,

  } = context;
  let searchResults = '';
  const length = 1;
  const NUM_RECIPES_SHOWN = 12;

  async function apiSearch(value, input, page) {
    switch (value) {
    case 'ingredient-search':
      searchResults = await fetchByIngredientApi(input, page);
      searchResults.splice(NUM_RECIPES_SHOWN, searchResults.length - 1);
      setRecipesList(searchResults);
      break;
    case 'name-search':
      searchResults = await fetchByNameApi(input, page);
      searchResults.splice(NUM_RECIPES_SHOWN, searchResults.length - 1);
      setRecipesList(searchResults);
      break;
    case 'first-letter-search':
      if (input.length > length) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        searchResults = await fetchByFirstLetterApi(input, page);
        searchResults.splice(NUM_RECIPES_SHOWN, searchResults.length - 1);
        setRecipesList(searchResults);
      }
      break;

    default:
      return searchResults;
    }
  }

  function generateRadioButtons(value, label, dataTest) {
    return (
      <label htmlFor="search-radio">
        {label}
        <input
          value={ value }
          name="search-radio"
          onClick={ (ev) => setSearchValue(ev.target.value) }
          type="radio"
          data-testid={ dataTest }
        />
      </label>
    );
  }

  return (
    <>
      <input
        data-testid="search-input"
        type="text"
        value={ inputValue }
        onChange={ (ev) => setInputValue(ev.target.value) }
      />

      {generateRadioButtons('ingredient-search',
        'Ingrediente', 'ingredient-search-radio')}
      {generateRadioButtons('name-search',
        'Nome', 'name-search-radio')}
      {generateRadioButtons('first-letter-search',
        'Primeira letra', 'first-letter-search-radio')}
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => apiSearch(searchValue, inputValue, pageOrigin) }
      >
        Buscar

      </button>
    </>
  );
}
