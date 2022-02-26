import React from "react";
import { Link } from "react-router-dom";

import styles from "./MovieCard.module.scss";

const imagePrefixUrl = "http://image.tmdb.org/t/p/w500";

const MovieCard = (props) => {
  const movie = props?.data;
  return (
    <Link to={`/movie/${movie.id}`} className={styles.container}>
      <img src={`${imagePrefixUrl}${movie.poster_path}`} alt={movie?.title} />
      <p>{movie?.title} </p>
    </Link>
  );
};

export default MovieCard;
