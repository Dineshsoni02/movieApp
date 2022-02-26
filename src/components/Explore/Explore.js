import React, { useEffect, useState } from "react";

import { getGenre, getMoviesWithGenreId } from "../../api/Movie";
import MovieCard from "../MovieCard/MovieCard";
import Paginate from "../Paginate/Paginate";

import styles from "./Explore.module.scss";

const Explore = () => {
  const [allGenre, setAllGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isdataloading, setIsdataloading] = useState(false);
  const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const fetchGenre = () => {
    getGenre().then((res) => {
      if (!res) return;
      setAllGenre(res.genres);
      // console.log(allGenre);
      setSelectedGenre([res.genres[0]]);
    });
  };

  const handleSelectedGenre = (genre) => {
    const tempGenre = [...selectedGenre];
    const currIndex = tempGenre.findIndex((item) => item.id === genre.id);
    if (currIndex < 0) {
      tempGenre.push(genre);
    } else {
      if (selectedGenre.length > 1) tempGenre.splice(currIndex, 1);
    }
    setSelectedGenre(tempGenre);
  };

  const fetchMovies = (page=1) => {
    if (selectedGenre.length === 0) return;
    const ids = selectedGenre.map((item) => item.id).join(",");
    setIsMoreMoviesLoading(true);
    getMoviesWithGenreId(ids,page).then((res) => {
      setIsdataloading(true);
      setIsMoreMoviesLoading(false);
      if (!res) return;
      if (page === 1) {
        setAllMovies(res?.results);
        setTotalPages(res?.total_pages);
      } else {
        setAllMovies((prev) => [...prev,...res?.results]);
      }
      setCurrentPage(res?.page);
    });
  };

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalPages) return;
    fetchMovies(currentPage + 1);
  };

  useEffect(() => {
    if (isNearEnd) handlePaginate();
  }, [isNearEnd]);
  useEffect(() => {
    fetchMovies(1);
  }, [selectedGenre]);

  useEffect(() => {
    fetchGenre();
  }, []);

  return (
    <div className={styles.container}>
      <header>
        {allGenre.map((item) => {
          return (
            <div
              key={item.id + item.name}
              className={`${styles.chip} ${
                selectedGenre.find((elem) => elem.id === item.id)
                  ? styles.active_Chip
                  : ""
              }
              `}
              onClick={() => handleSelectedGenre(item)}
            >
              {item.name}
            </div>
          );
        })}
      </header>

      {!isdataloading && !isMoreMoviesLoading ? (
        <b>Loading...</b>
      ) : (
        <Paginate onIntersection={(isNearEnd) => setIsNearEnd(isNearEnd)}>
          <div className={styles.title}>Explore Movies</div>
          <div className={styles.body}>
            {allMovies.map((item, index) => {
              return <MovieCard data={item} key={item.id + " " + index + ""} />;
            })}
          </div>
          {isMoreMoviesLoading && (
            <span className={styles.title}>Loading...</span>
          )}
        </Paginate>
      )}
    </div>
  );
};

export default Explore;
