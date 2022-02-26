import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Heart, Clock } from "react-feather";

import MovieCard from "../MovieCard/MovieCard";
import { getMovieDetails, getSimilarMovies } from "../../api/Movie";

import styles from "./MoviesPage.module.scss";
const imagePrefixUrl = "http://image.tmdb.org/t/p/original";

const MoviesPage = () => {
  const params = useParams();
  const movieid = params.movieid;

  const [movie, setMovie] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const fetchMovieDetails = () => {
    getMovieDetails(movieid).then((res) => {
      if (!res) return;
      setMovie(res);
    });
  };

  const fetchSimilarMovies = () => {
    getSimilarMovies(movieid).then((res) => {
      if (!res) return;
      setSimilarMovies(res?.results);
    });
  };


  useEffect(() => {
    fetchMovieDetails();
    fetchSimilarMovies();
  }, [movie]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img
          className={styles.backdropImage}
          src={`${imagePrefixUrl}${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className={styles.details}>
          <img
            className={styles.posterImage}
            src={`${imagePrefixUrl}${movie?.poster_path}`}
            alt={movie?.title}
          />
          <div className={styles.movieDetails}>
            <div className={styles.title}>
              <div className={styles.tagline}>{movie?.tagline}</div>
              {movie?.original_title}
            </div>

            <div className={styles.overview}>{movie?.overview}</div>
            <div className={styles.popularity}>
              <Heart className={styles.dataIcon} /> {movie?.popularity} Million
            </div>
            <div className={styles.runtime}>
              <Clock className={styles.dataIcon} /> {movie?.runtime} min
            </div>
          </div>
        </div>
      </div>
      <div className={styles.similar}>
        <div className={styles.title}>Similar movies</div>
        <div className={styles.innerContainer}>
          {similarMovies.map((item) => {
            return (
              <MovieCard key={item.id + " "} data={item} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
