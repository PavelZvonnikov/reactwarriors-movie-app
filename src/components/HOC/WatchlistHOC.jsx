import React from "react";

import { CallApi } from "../../api/api.js";

export const WatchlistHOC = Component =>
  class HOC extends React.Component {
    constructor() {
      super();

      this.state = {
        isLoaded: false,
        watchlist: {}
      };
    }

    toggleWatchlistFilm = filmID => {
      const { watchlist } = this.state;
      this.setState({
        watchlist: {
          ...watchlist,
          [filmID]: !watchlist[filmID]
        }
      });
    };

    watchlistFilmsCreateObj = filmsList => {
      const resultObj = {};
      filmsList.forEach(film => (resultObj[film.id] = true));
      return resultObj;
    };

    getData = () => {
      const { sessionID, user } = this.props;
      CallApi.get(`/account/${user.id}/watchlist/movies`, {
        params: {
          session_id: sessionID,
          language: "ru-RU",
          sort_by: "created_at.asc"
        }
      }).then(({ results }) => {
        const watchlist = this.watchlistFilmsCreateObj(results);
        this.setState({ watchlist });
      });
    };

    getWatchlist = () => {
      const { isLoaded } = this.state;
      const { user } = this.props;
      if (!isLoaded && user && user.id) {
        this.getData();
        this.setState({
          isLoaded: true
        });
      }
    };

    componentDidMount() {
      this.getWatchlist();
    }

    componentDidUpdate() {
      this.getWatchlist();
    }

    render() {
      const { watchlist } = this.state;

      return (
        <Component
          {...this.props}
          watchlist={watchlist}
          toggleWatchlistFilm={this.toggleWatchlistFilm}
        />
      );
    }
  };
