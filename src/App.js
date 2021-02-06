import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/InitialRecipes/Foods';
import Drinks from './pages/InitialRecipes/Drinks';
import FoodsDetails from './pages/DetailsPages/FoodsDetails';
import DrinksDetails from './pages/DetailsPages/DrinksDetails';
import FoodRecipeProgress from './pages/RecipesProgress/FoodRecipeProgress';
import DrinkRecipeProgress from './pages/RecipesProgress/DrinkRecipeProgress';
import Explore from './pages/Explore/Explore';
import ExploreFoods from './pages/Explore/ExploreFoods';
import ExploreDrinks from './pages/Explore/ExploreDrinks';
import ExploreFoodsIngredients from './pages/Explore/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/Explore/ExploreDrinksIngredients';
import ExploreFoodsArea from './pages/Explore/ExploreFoodsArea';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" component={ FoodsDetails } />
      <Route exact path="/bebidas/:id" component={ DrinksDetails } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodRecipeProgress }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ DrinkRecipeProgress }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsArea } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
      <Route component={ () => <div>Not Found</div> } />
    </Switch>
  );
}

export default App;
