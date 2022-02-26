import React from "react";

import styles from "./App.module.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./components/Main/Main";
import Navbar from "./components/navbar/Navbar";
import Explore from "./components/Explore/Explore";
import MoviesPage from "./components/MoviesPage/MoviesPage";

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/movie/:movieid" element={<MoviesPage />} />
          <Route path="/" element={<Main />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
