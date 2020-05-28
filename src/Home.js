import React, { useState } from "react";
import Layout from "./layout";
import Search from "./Search";
import MoviesList from "./MoviesList";

const link = "https://api.themoviedb.org/3/";
const apikey = "d1426caae4746a010983a3dbcf8acc35";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchUpdate = searchField => {
    setIsLoading(true);

    fetch(
      link +
        "search/movie?api_key=" +
        apikey +
        "&query=" +
        searchField +
        "&page=1&include_adult=false"
    )
      .then(res => res.json())
      .then(
        data => {
          setIsLoading(false);
          setMovies(data.results);
          //console.log(data.results);
        },

        error => {
          console.log(error);
        }
      );
  };
  return (
    <Layout>
      <Search updateSearch={searchUpdate} />

      {isLoading ? "" : <MoviesList moviesList={movies} />}
    </Layout>
  );
};

export default Home;
