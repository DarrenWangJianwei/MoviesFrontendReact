import React from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import { getGenres } from "../sources/genreService";
import { getMovie, saveMovie } from "../sources/movieService";

class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
    genresCollection: [],
    errors: {},
  };
  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    genreId: Joi.string().required().label("Genre"),
    _id: Joi.string().label("ID"),
  };
  async populateGenres() {
    const { data: genresCollection } = await getGenres();
    this.setState({ genresCollection });
  }
  async populateMovie() {
    try {
      const movieID = this.props.match.params.id;
      if (movieID === "new") return;

      const { data: movie } = await getMovie(movieID);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { genresCollection } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <div className="input">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", genresCollection)}
            {this.renderInput("numberInStock", "Number In Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate", "number")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MoviesForm;
