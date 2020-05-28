import React, { useEffect, useState } from "react";
import Layout from "./layout";

import { useRouteMatch, Link } from "react-router-dom";
import Swal from "sweetalert2";

const MoviePage = () => {
  const match = useRouteMatch();
  const matchID = match.params.id;
  const baseImageURL = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState({});
  const [movieLoaded, setMovieLoaded] = useState(false);
  const [buttonType, setButtonType] = useState("Save");

  const saveMovie = id => {
    let jsonMovies = JSON.parse(localStorage.getItem("movies"));
    if (Array.isArray(jsonMovies) === false) jsonMovies = [];

    if (jsonMovies.includes(id) === false) {
      jsonMovies.push(id);
      localStorage.setItem("movies", JSON.stringify(jsonMovies));
      if (
        Swal.fire({
          title: `${movie.original_title} was added to favorites`,
          type: "success",
          text: "Your changes have been saved."
        })
      ) {
      }
    } else {
      const updatedJsonMovies = jsonMovies.filter(item => item !== id);
      localStorage.setItem("movies", JSON.stringify(updatedJsonMovies));

      if (
        Swal.fire({
          icon: "error",
          title: `${movie.original_title} was removed from favorites`,
          text: "Your changes have been saved."
        })
      ) {
      }
    }

    updateButtonType();
  };

  const updateButtonType = () => {
    let jsonMovies = JSON.parse(localStorage.getItem("movies"));

    if (jsonMovies.includes(matchID)) {
      setButtonType("Remove");
    } else {
      setButtonType("Save");
    }
  };

  useEffect(() => {
    updateButtonType();

    fetch(
      "https://api.themoviedb.org/3/movie/" +
        matchID +
        "?api_key=d1426caae4746a010983a3dbcf8acc35&language=en-US"
    )
      .then(res => res.json())
      .then(
        data => {
          console.log(data);

          setMovie(data);
          setMovieLoaded(true);
        },
        error => {
          console.log(error);
        }
      );
  }, [matchID]);

  // Ge möjligheten att lägga betyg

  return (
    <Layout>
      {!movieLoaded ? (
        <div></div>
      ) : (
        <div className="movie-page">
          {movie.poster_path ? (
            <img
              src={baseImageURL + movie.poster_path}
              alt={movie.original_title}
            ></img>
          ) : null}

          <div className="movie-page-info">
            <h1 style={{ fontWeight: "bold" }}> {movie.original_title} </h1>
            <p> {movie.overview}</p>

            <p>
              Genres:{" "}
              {movie.genres.map((genre, i) => {
                return <React.Fragment key={i}>{genre.name}, </React.Fragment>;
              })}{" "}
            </p>

            <p>Release date: {movie.release_date}</p>
          </div>
        </div>
      )}

      {buttonType === "Save" ? (
        <img src="https://cdn2.iconfinder.com/data/icons/atrous/512/floppy_disk_save-512.png" style={{ maxHeight: "30px" }} onClick={() => saveMovie(matchID)} />
      ) : (
        <img src="https://cdn4.iconfinder.com/data/icons/icocentre-free-icons/114/f-cross_256-512.png" style={{ maxHeight: "30px" }} onClick={() => saveMovie(matchID)} />
        //<button onClick={() => saveMovie(matchID)}>Remove</button>
      )}
    </Layout>
  );
};

export default MoviePage;
