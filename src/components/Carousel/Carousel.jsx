import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CarouselWrapper from './styles';
import useFetchRecipes from '../../effects/useFetchRecipes';
import CardList from '../CardList/CardList';

const MAX_LENGTH = 6;
const endpointMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const endpointDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Carousel({ type }) {
  // const [currentImage, setCurrentImage] = useState(0);
  const [recommendations, setRecomendations] = useState([]);
  const [, setFetchUrl] = useFetchRecipes(type);
  const currRecomendation = type === 'meals' ? 'drinks' : 'meals';

  const fetchFilteredMealRecipes = useCallback(async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      const formattingData = {
        ...data,
        [currRecomendation]: data[currRecomendation].slice(0, MAX_LENGTH),
      };
      if (formattingData[currRecomendation] !== null) {
        setRecomendations(formattingData[currRecomendation]);
      }
      console.log(formattingData[currRecomendation]);
    } catch (err) {
      console.log(err);
    }
  }, [currRecomendation]);

  useEffect(() => {
    const setCarousel = () => {
      if (type === 'meals') return fetchFilteredMealRecipes(endpointDrinks);
      return fetchFilteredMealRecipes(endpointMeal);
    };
    setCarousel();
  }, [fetchFilteredMealRecipes, setFetchUrl, type]);

  return (
    <CarouselWrapper>
      <div className="title-wrapper">
        <h3>Recomendadas</h3>
      </div>
      <div className="card-grid">
        <CardList recipes={ recommendations } type={ currRecomendation } />
      </div>
      {/* <div className="right">ícone right</div> */}
      {/* <div className="left">ícone left</div> */}
    </CarouselWrapper>
  );
}

export default Carousel;
Carousel.propTypes = {
  type: PropTypes.string.isRequired,
};
