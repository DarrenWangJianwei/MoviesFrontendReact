
import './App.css';
import React, { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import {Route,Switch,Redirect} from 'react-router-dom';
// import NavBar from './components/navBar'
// import Counters from './components/counters'
// import {getMovies} from './sources/fakeMovieService'
import Movies from './components/movies';
import Customer from './components/customer';
import Rentals from './components/Rentals';
import NotFound from './components/notFound';
import TopNavBar from './components/topNavBar';
import MoviesForm from './components/movieForm'
import Login from './components/login'
import Register from './components/register';
import Logout from './components/logout';
import auth from './sources/authService';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/commons/protectedRoute';

class App extends Component {
  state = { 
    // counters: [
    //     {id:1,value:4},
    //     {id:2,value:0},
    //     {id:3,value:0},
    //     {id:4,value:0}
    // ],
 };
componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({user});
}

handleDelete = (counterID) =>{
    const counters = this.state.counters.filter(c => c.id !== counterID);
    this.setState({counters : counters})
}
handleReset = () =>{
    const counters = this.state.counters.map(c=>{c.value = 0; return c})
    this.setState({ counters });
}
handleIncrement = (counter) =>{
    const counters = [...this.state.counters];
    const indexOfCounter = counters.indexOf(counter);
    counters[indexOfCounter] = counter;
    counters[indexOfCounter].value += 1;
    this.setState({counters});
}
handleDecrement = (counter) =>{
      const counters = [...this.state.counters];
      const indexOfCounter = counters.indexOf(counter);
      counters[indexOfCounter] = counter;
      counters[indexOfCounter].value -=1;
      this.setState({counters});
}

  render() { 
    return (
      <div>
        <TopNavBar user={this.state.user}/>
        <ToastContainer />
        <div className="Route">
          <Switch>
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/customer" component={Customer} />
            <Route path="/movies" exact 
              render={props => <Movies {...props} user={this.state.user}/>} />
            <ProtectedRoute path="/movies/:id" component={MoviesForm} />
            <Route path="/not-found" exact component={NotFound}/>
            <Route path="/register" component={Register} />
            <Route path="/movies/new" component={MoviesForm} />
            <Redirect from="/" exact to="movies" />
            <Redirect to="/not-found"/>
          </Switch>
        </div>
      </div>     
      /* <NavBar
         totalCounters = {this.state.counters.filter(c=>c.value>0).length}
      /> */
      // <main className="container">
      //   {/* <Counters 
      //     counters = {this.state.counters}
      //     onDelete = {this.handleDelete}
      //     onDecrement = {this.handleDecrement}
      //     onIncrement = {this.handleIncrement}
      //     onReset = {this.handleReset}
        
      //   /> */}
      // </main>
      );
  }
}
 
export default App;
