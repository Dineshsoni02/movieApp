import React from "react";
import styles from "./Navbar.module.scss";
import { Search } from "react-feather";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <Link to="/">Moviemania</Link>
      </div>
      <div className={styles.right}>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search movies" />
          <Search />
        </div>
        <div className={styles.explore}>
          <Link to="/explore"> Explore</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
