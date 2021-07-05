const fetchDrinkByCategory = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default fetchDrinkByCategory;
