import React, { Component } from "react";
import Table from "./common/table.component";
import Rating from "./rating.component";
import getMovies from "../service/get-movies.service";
import getGenres from "../service/get-genres.service"
import Pagination from "./common/pagination.component";
import Filter from "./common/filtering.component";
import _ from "lodash";

class Movies extends React.Component {
    state = {
        movies: [],
        sortColumn: {path: 'id', order: 'asc'},
        activePage: 1,
        pageCount: 5,
        genres: [],
        selectedGenre : "All Genres"        
    }

    componentDidMount() {
      const movies = getMovies();
      const genres = ["All Genres", ...getGenres()];
      this.setState({ ...this.state,movies,genres });
    }

    handleToggleRating = movieRank => {
      const movies = [...this.state.movies];
      const movie = movies.find(movie => movie.id === movieRank)
      movie.your_rating = !(movie.your_rating);
      this.setState({...this.state, movies });
    }

    handleSort = (sortColumn) =>{
      this.setState ({ ...this.state, sortColumn })
    }
    handleClick = (activePage) => {
      this.setState ({ ...this.state, activePage })
    }
    handleClickFilter = (selectedGenre) => {
      this.setState ({ ...this.state, selectedGenre })
    }
    filterMovies = () =>{
      const {movies, selectedGenre} = this.state;
      const filteredMovies = movies.filter(movie => {
        if(selectedGenre === "All Genres") return true;
        if(movie.genres.includes(selectedGenre)) return true;
        return false;
      });
      return filteredMovies;
    }
    paginateMovies = (movies) => {
        const { activePage, pageCount } = this.state;
        const start = (activePage - 1) * pageCount;
        const paginateMovies = movies.slice(start, start + pageCount);
        return paginateMovies;
        //suppose active page 3. total data 50. ek page e 5 ta data
        //taile, previous 2 ta page e 5*2 = 10 ta data already ase
        // so start er por theke
        //11 theke start
        //end ta last member + pagecount
    }

    sortMovies = (movies) => {
      const {sortColumn} = this.state;
      const sortedMovies = _.orderBy(movies,[sortColumn.path], [sortColumn.order]);//kon item ke sort, kon field dara sort
      return sortedMovies;
    }

  render() {
    const filteredMovies = this.filterMovies();
    const paginateMovies = this.paginateMovies(filteredMovies);
    const movies = this.sortMovies(paginateMovies);
    const columns = [
        {
          label: 'Rank', 
          path: 'id',
          sorting: true, 
          content: (movie,key) => <td>{movie[key]}</td> 
        },
        {
          label: 'Title',
          sorting: true, 
          path: 'title', 
          content:(movie,key) => <td>{movie[key]}</td> 
        },
        {
          label: 'Poster', 
          path: 'posterUrl', 
          content: (movie,key) => <td><img src={movie[key]} style={{ height: "100px", width: "auto" }}/></td> 
        },
        {
          label: 'Your Rating', 
          path: 'your_rating', 
          content: (movie,key) => <td><Rating 
                                        isRated={movie[key]} 
                                        rank={movie.id} 
                                        handleToggleRating={this.handleToggleRating}/>
                                  </td> },
        {
          label: 'Action', 
          path: 'action', 
          content: (movie,key) => <td>{movie[key]}</td> 
        }
    ]
    return (
      <>
        <div className="container">
          <div className="row">
            <Filter items={this.state.genres} selectedGenre={this.state.selectedGenre} onClickFilter={this.handleClickFilter}/>
            <div className="col-lg-8">

            <Table 
              item={movies} 
              columns={columns} 
              onSort={this.handleSort} 
              sortColumn={this.state.sortColumn}/>

            <Pagination 
              totalItems={filteredMovies.length} 
              pageCount={this.state.pageCount} 
              activePage={this.state.activePage}
              onClickPage={this.handleClick}/>

            </div>
          </div>
        </div>
       

        </>
    );
  }
}

export default Movies;
