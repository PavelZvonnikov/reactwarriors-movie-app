import React from "react";
import Cookies from "universal-cookie";

import { Filters } from "./Filters/Filters";
import { MoviesList } from "./Movies/MoviesList";
import { yearsList } from "../data/yearsList.js";
import { Header } from "./Header/Header";
import { API_URL, API_KEY_3, fetchApi } from "../api/api.js";

const cookies = new Cookies();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "popularity.desc",
        year: 0
      },
      page: 1,
      yearsList: yearsList,
      amountFilms: 0,
      genres: []
    };
  }

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionID = id => {
    cookies.set("session_id", id, { path: "/", maxAge: 2592000 });
    this.setState({
      session_id: id
    });
  };

  onChangeFilters = e => {
    const newFilters = {
      ...this.state.filters,
      [e.target.name]: e.target.value
    };
    this.setState({
      filters: newFilters,
      page: 1
    });
  };

  onChangePage = page => {
    this.setState({
      page: page
    });
  };

  getAmountPages = value => {
    this.setState({
      amountFilms: value
    });
  };

  clearFilters = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        year: 0
      },
      page: 1
    });
  };

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(({ genres }) => {
        this.setState({
          genres: genres.map(genres => ({ ...genres, checked: false }))
        });
      });
  };

  onChangeGenres = ({ target: { id } }) => {
    const { genres } = this.state;

    const newGenresList = genres.map(genre =>
      genre.id === Number(id)
        ? {
            ...genre,
            checked: !genre.checked
          }
        : {
            ...genre
          }
    );

    this.setState({
      genres: newGenresList,
      page: 1
    });
  };

  componentDidMount() {
    this.getGenres();
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  render() {
    const { filters, page, yearsList, amountFilms, genres, user } = this.state;

    return (
      <div>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionID={this.updateSessionID}
        />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    page={page}
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    onChangePage={this.onChangePage}
                    yearsList={yearsList}
                    amountFilms={amountFilms}
                    clearFilters={this.clearFilters}
                    genres={genres}
                    onChangeGenres={this.onChangeGenres}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList
                filters={filters}
                genres={genres}
                page={page}
                onChangePage={this.onChangePage}
                getAmountPages={this.getAmountPages}
                onChangeGenres={this.onChangeGenres}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
