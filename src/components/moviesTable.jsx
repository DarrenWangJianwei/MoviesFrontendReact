import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./commons/table";
import Like from "./like";
import SearchInput from "./commons/searchInput";
import Auth from "../sources/authService";
class MoviesTable extends Component {
  titlesArray = [
    {
      name: "title",
      label: "Title",
      content: (m) => <Link to={`/movies/${m._id}`}>{m.title}</Link>,
    },
    { name: "genre.name", label: "Genre" },
    { name: "numberInStock", label: "Stock" },
    { name: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (m) => (
        <Like movie={m} onClickLike={() => this.props.onLike(m)} />
      ),
    },
  ];
  deleteButton = {
    key: "delete",
    content: (m) => (
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => this.props.onDelete(m._id)}
      >
        Delete
      </button>
    ),
  };
  constructor() {
    super();
    const user = Auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.titlesArray.push(this.deleteButton);
    }
  }
  showingMovies(moviesWithGenre) {
    return moviesWithGenre.length === 0 ? (
      <p>There are no movies in the database.</p>
    ) : (
      <p>Showing {moviesWithGenre.length} movies in the database</p>
    );
  }

  render() {
    const {
      movies,
      sortMovies,
      onSort,
      sortColumn,
      searchValue,
      onSearchChange,
      user,
    } = this.props;

    return (
      <React.Fragment>
        {user && (
          <Link className="btn btn-primary" to="/movies/new">
            New Movie
          </Link>
        )}
        {this.showingMovies(sortMovies)}
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          name="searchInput"
        />
        <Table
          titlesArray={this.titlesArray}
          onSort={onSort}
          sortColumn={sortColumn}
          data={movies}
        />
      </React.Fragment>
    );
  }
}

export default MoviesTable;
