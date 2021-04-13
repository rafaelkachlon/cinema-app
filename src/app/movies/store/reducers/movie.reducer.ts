import * as movieActions from '../actions/movie.actions';

export interface MovieState {
  movies: any[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initialState: MovieState = {
  movies: [],
  loaded: false,
  loading: false,
  error: false
};

export function movieReducer(state = initialState, action: movieActions.MoviesAction): MovieState {
  switch (action.type) {
    case movieActions.LOAD_MOVIES: {
      return {...state, loading: true};
    }

    case movieActions.LOAD_MOVIES_SUCCESS: {
      const movies = action.payload;
      return {...state, loading: false, loaded: true, movies};
    }
    case movieActions.LOAD_MOVIES_FAIL: {
      return {...state, loading: false, loaded: false, error: true};
    }
    case movieActions.CREATE_MOVIE_SUCCESS: {
      const movies = [...state.movies, action.payload];
      return {...state, movies};
    }

    case movieActions.UPDATE_MOVIE_SUCCESS: {
      const updatedMovie = action.payload;
      const movies = [...state.movies];
      const existingMovie = movies.find(x => x.id === updatedMovie.id);
      if (!existingMovie) {
        return state;
      }
      const index = state.movies.indexOf(existingMovie);
      movies[index] = updatedMovie;
      return {...state, movies};
    }

    case movieActions.REMOVE_MOVIE_SUCCESS: {
      const movie = action.payload;
      const existingMovie = state.movies.some(m => m.id === movie.id);
      if (!existingMovie) {
        return state;
      }

      return {
        ...state,
        movies: state.movies.filter(m => m.id !== movie.id)
      };
    }
  }
  return state;
}

export const getMovies = (state: MovieState) => state.movies;
export const getMoviesLoading = (state: MovieState) => state.loading;
export const getMoviesLoaded = (state: MovieState) => state.loaded;
export const getMoviesError = (state: MovieState) => state.error;
