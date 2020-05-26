import React, { useState } from 'react';
import './App.css';

import Home from "./Home"
import MoviePage from "./MoviePage"
import SavedMoviesPage from "./SavedMoviesPage"
import Layout from "./layout"

import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {



  return (
    <BrowserRouter>

      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/saved-movies" exact component={SavedMoviesPage} />
        <Route path="/movie/:id" exact component={MoviePage} />

        <Route path="/" render={() =>
          <Layout>
            <h1 style={{ marginTop: "20px", textAlign: "center" }}>404</h1>
          </Layout>
        } />

      </Switch>

    </BrowserRouter>
  );
}

export default App;
