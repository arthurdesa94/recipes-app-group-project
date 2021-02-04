import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinksDetails';
import FoodRecipeProgress from './pages/FoodRecipeProgress';
import DrinkRecipeProgress from './pages/DrinkRecipeProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsArea from './pages/ExploreFoodsArea';
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
