import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <Link to="/">Moviemania</Link>
      </div>
        <div className={styles.explore}>
          <Link to="/explore"> Explore</Link>
        </div>
    </div>
  );
};

export default Navbar;
