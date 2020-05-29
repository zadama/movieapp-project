import React, { useState, useEffect } from "react";
import Layout from "./layout";
import MoviesList from "./MoviesList";

const SavedMoviesPage = () => {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getData(movieID) {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieID +
          "?api_key=d1426caae4746a010983a3dbcf8acc35&language=en-US"
      ).then(response => response.json());

      return data;
    } catch (er) {
      console.log("could not fetch Ip-Address", er);
    }
  }

  useEffect(() => {
    let movieIDs = JSON.parse(localStorage.getItem("movies"));
    let moviesArr = [];

    if (!movieIDs) {
      return;
    }

    async function fetchData() {
      for (let i = 0; i < movieIDs.length; i++) {
        let movieData = await getData(movieIDs[i]);

        moviesArr.push(movieData);
      }

      setMovies(moviesArr);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <Layout>
      {isLoading ? <div></div> : <MoviesList moviesList={movies} />}
    </Layout>
  );
};

export default SavedMoviesPage;
