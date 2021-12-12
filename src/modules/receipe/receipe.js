import React, { useEffect, useState } from 'react'
import './receipe.css';
import ReceipeBox from '../../components/Receipe-box/ReceipeBox';
  
const ReceipeCom = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes();
  }, [query])
  const getRecipes = async () => {
    const response = await fetch
          (`https://api.edamam.com/api/recipes/v2?q=${query}&app_id=abeb51da&app_key=10e11369bf9bf0cf16b5a8eeec667342&type=public`);
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data);
  
  };
  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  
  return (
    <div className="App" style={{"background-image": "linear-gradient( 95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% )"}}>
      <form className="search-form" onSubmit={getSearch}  >
        <input className="search-bar" type="text" value={search}
             onChange={updateSearch} />
        <button className="search-button" type="submit" >
             Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <ReceipeBox
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
  
        ))}
      </div>
  
    </div>
  );
}
  
export default ReceipeCom;