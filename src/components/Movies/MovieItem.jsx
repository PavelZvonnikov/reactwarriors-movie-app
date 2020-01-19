import React from "react";
import { Star } from "../Icons/Star";
import { BookMark } from "../Icons/BookMark";
import { CallApi } from "../../api/api";
import { AppContextHOC } from "../HOC/AppContextHOC";

class MovieItem extends React.Component {
  toggleFavorite = () => {
    const { toggleFavoriteFilm, item, user, session_id, favorite } = this.props;

    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: item.id,
        favorite: !favorite
      }
    }).then(data => {
      console.log(data);
    });

    toggleFavoriteFilm(item.id);
  };

  toggleWatchlist = () => {
    const {
      toggleWatchlistFilm,
      item,
      user,
      session_id,
      inWatchlist
    } = this.props;
    CallApi.post(`/account/${user.id}/watchlist`, {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: item.id,
        watchlist: !inWatchlist
      }
    }).then(data => {
      console.log(data);
    });
    toggleWatchlistFilm(item.id);
  };

  render() {
    const { item, favorite, inWatchlist, session_id } = this.props;

    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text mb-1">Рейтинг: {item.vote_average}</div>
          {session_id && (
            <div className="button-wrapper">
              <button
                type="button"
                className="custom-button"
                onClick={this.toggleFavorite}
              >
                <Star favorite={favorite} />
              </button>
              <button
                type="button"
                className="custom-button"
                onClick={this.toggleWatchlist}
              >
                <BookMark watchlist={inWatchlist} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieItem);
