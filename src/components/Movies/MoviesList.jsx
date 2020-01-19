import React from "react";
import PropTypes from "prop-types";

import MovieItem from "./MovieItem";
import { MoviesHOC } from "../HOC/MoviesHOC";

import { FavoriteFilmsHOC } from "../HOC/FavoriteFilmsHOC";
import { WatchlistHOC } from "../HOC/WatchlistHOC";

const MoviesList = ({
  movies,
  favoriteFilms,
  watchlist,
  toggleFavoriteFilm,
  toggleWatchlistFilm
}) => (
  <div className="row">
    {movies.map(movie => (
      <div key={movie.id} className="col-6 mb-4">
        <MovieItem
          item={movie}
          inWatchlist={Boolean(watchlist[movie.id])}
          favorite={Boolean(favoriteFilms[movie.id])}
          toggleFavoriteFilm={toggleFavoriteFilm}
          toggleWatchlistFilm={toggleWatchlistFilm}
        />
      </div>
    ))}
  </div>
);

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default WatchlistHOC(FavoriteFilmsHOC(MoviesHOC(MoviesList)));
