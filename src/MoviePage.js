import React, { useEffect, useState } from "react";
import Layout from "./layout";

import { useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";

import RemoveImg from "./remove-movie.webp";
import SaveImg from "./save-movie.png";

const MoviePage = () => {
  const match = useRouteMatch();
  const matchID = match.params.id;
  const baseImageURL = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState({});
  const [movieLoaded, setMovieLoaded] = useState(false);
  const [buttonType, setButtonType] = useState("Save");

  const saveText = 'Your changes have been saved.';

  const saveMovie = id => {
    let jsonMovies = JSON.parse(localStorage.getItem("movies"));
    if (Array.isArray(jsonMovies) === false) jsonMovies = [];

    if (jsonMovies.includes(id) === false) {
      jsonMovies.push(id);
      localStorage.setItem("movies", JSON.stringify(jsonMovies));
      if (
        Swal.fire({
          title: `${movie.original_title} was added to favorites`,
          text: saveText
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
          text: saveText
        })
      ) {
      }
    }

    updateButtonType();
  };

  const updateButtonType = () => {
    let jsonMovies = JSON.parse(localStorage.getItem("movies"));

    if (!jsonMovies) {
      return;
    }

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

            {buttonType === "Save" ? (
              <img
                src={SaveImg}
                alt="Save"
                style={{
                  maxHeight: "30px",
                  cursor: "pointer",
                  paddingTop: "20px",
                  marginTop: "auto",
                  alignSelf: "flex-start"
                }}
                onClick={() => saveMovie(matchID)}
              />
            ) : (
              <img
                src={RemoveImg}
                alt="Remove"
                style={{
                  maxHeight: "30px",
                  cursor: "pointer",
                  marginTop: "auto",
                  alignSelf: "flex-start"
                }}
                onClick={() => saveMovie(matchID)}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MoviePage;
