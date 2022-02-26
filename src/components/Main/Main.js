import React, { useEffect, useState } from "react";

import { getPopularMovies } from "../../api/Movie";
import MovieCard from "../MovieCard/MovieCard";
import Paginate from "../Paginate/Paginate";

import styles from "./Main.module.scss";

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isdataloading, setIsdataloading] = useState(false);
  const [totalpages, setTotalpages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreMoviesLoading, setisMoreMoviesLoading] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const fetchPopularMovies = (page) => {
    setisMoreMoviesLoading(true);
    getPopularMovies(page).then((res) => {
      if (!res) return;
      setisMoreMoviesLoading(false);
      setIsdataloading(true);
      if (currentPage === 1) {
        setPopularMovies(res?.results);
        setTotalpages(res?.total_pages);
      } else {
        setPopularMovies((prev) => [...prev, ...res?.results]);
      }
      setCurrentPage(res?.page);
    });
  };

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalpages) return;
    fetchPopularMovies(currentPage + 1);
  };
  useEffect(() => {
    if (isNearEnd) handlePaginate();
  }, [isNearEnd]);

  useEffect(() => {
    fetchPopularMovies(1);
  },[]);
  return (
    <div className={styles.Main}>
      {!isdataloading && !isMoreMoviesLoading ? (
        "loading..."
      ) : (
        <Paginate onIntersection={(isonEnd) => setIsNearEnd(isonEnd)}>
          <div className={styles.title}>Popular Movies</div>
          <div className={styles.innerContainer}>
            {popularMovies.map((item, index) => {
              return <MovieCard data={item} key={item.id + " " + index} />;
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

export default Main;
