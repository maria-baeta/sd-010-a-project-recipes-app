import React from 'react';
import PropTypes from 'prop-types';
import ExploreIngredients from '../components/ExploreIngredients';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinksIngredients({ match: { path } }) {
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <ExploreIngredients path={ path } />
      <Footer />
    </>
  );
}

ExploreDrinksIngredients.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreDrinksIngredients;
