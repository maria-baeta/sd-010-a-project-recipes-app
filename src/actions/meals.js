import { fetchMealsCategories } from '../services/fetchCategories';
import fetchMeals from '../services/fetchMeals';

export const API_FETCH = 'API_FETCH';
export const STORE_CATEGORIES = 'STORE_CATEGORIES';
export const STORE_MEALS = 'STORE_MEALS';
export const SET_MEALS_FILTER = 'SET_MEALS_FILTER';

export const apiFetch = () => ({ type: API_FETCH });

export const storeCategories = (payload) => ({ type: STORE_CATEGORIES, payload });

export const storeMeals = (payload) => ({ type: STORE_MEALS, payload });

export const setMealsFilter = (payload) => ({ type: SET_MEALS_FILTER, payload });

export function getMealsCategories() {
  return async (dispatch) => {
    dispatch(apiFetch());
    const categories = await fetchMealsCategories();
    dispatch(storeCategories(categories));
  };
}

export function getMeals(filter) {
  return async (dispatch) => {
    dispatch(apiFetch());
    const meals = await fetchMeals(filter);
    dispatch(storeMeals(meals));
  };
}
