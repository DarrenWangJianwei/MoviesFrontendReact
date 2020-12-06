import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GenresNav from "./genresNav";
import _ from "lodash";
import { getMovies, deleteMovie } from "../sources/movieService";
import { getGenres } from "../sources/genreService";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    allgenres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" },
    searchInput: "",
  };
  async componentDidMount() {
    const { data: movies } = await getMovies();
    let { data: genres } = await getGenres();
    genres = [{ name: "All Genres" }, ...genres];
    this.setState({ movies: movies, allgenres: genres });
  }

  handleToggle = (movie) => {
    const movies = [...this.state.movies];
    const indexOfMovie = movies.indexOf(movie);
    movies[indexOfMovie].like = movies[indexOfMovie].like ? false : true;
    this.setState({ movies });
  };
  handleDelete = async (id) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== id.toString());
    console.log(movies);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        toast.error("This movie has already been deleted!");

      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (selectedItem) => {
    this.setState({
      selectedGenre: selectedItem,
      currentPage: 1,
      searchInput: "",
    });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  //since in the SearchInput component, we declear the onChange method return e.currentTarget.value directly.
  handleSearchChange = (value) => {
    this.setState({
      searchInput: value,
      selectedGenre: {},
      currentPage: 1,
    });
  };
  getPageData() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchInput,
    } = this.state;
    let moviesWithGenreOrSearch = [];
    if (searchInput.trim() !== "") {
      moviesWithGenreOrSearch = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      moviesWithGenreOrSearch =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    }

    const sortMovies = _.orderBy(
      moviesWithGenreOrSearch,
      sortColumn.path,
      sortColumn.order
    );
    const movies = paginate(sortMovies, currentPage, pageSize);
    return [movies, sortMovies];
  }
  render() {
    const {
      pageSize,
      currentPage,
      allgenres,
      selectedGenre,
      sortColumn,
      searchInput,
    } = this.state;
    const [movies, sortMovies] = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <GenresNav
            genres={allgenres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <MoviesTable
            movies={movies}
            onLike={this.handleToggle}
            onDelete={this.handleDelete}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            sortMovies={sortMovies}
            searchValue={searchInput}
            onSearchChange={this.handleSearchChange}
            user={this.props.user}
          />
          <Pagination
            totalNumber={sortMovies.length}
            pageSize={pageSize}
            handlePageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
