import React, { useContext, useState } from 'react';
import Header from '../components/Header';

import FavoritesContext from '../contexts/FavoritesContext';

import FavoriteRecipeCard from '../components/ReceitasFavoritas/FavoriteRecipeCard';

export default function ReceitasFavoritas() {
  const { favorites } = useContext(FavoritesContext);
  const [filter, setFilter] = useState('');

  const filteredFavorites = filter
    ? favorites.filter((recipe) => recipe.type === filter) : favorites;
  return (
    <div>
      <Header
        title="Receitas Favoritas"
        enableSearchIcon={ false }
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value=""
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          value="comida"
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="bebida"
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          Drink
        </button>
        {filteredFavorites.map((fav, index) => (
          <FavoriteRecipeCard key={ index } recipe={ fav } index={ index } />
        ))}
      </div>
    </div>
  );
}
