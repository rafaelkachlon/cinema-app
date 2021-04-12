// import {MovieState} from '../reducers/movie.reducer';
// import {createFeatureSelector, createSelector} from '@ngrx/store';
//
// export const selectMovies = (state: MovieState) => state.movies;
// export const selectIsLoading = (state: MovieState) => state.isLoading;
// export const selectIsLoaded = (state: MovieState) => state.isLoaded;
//
// export const getMoviesState = createFeatureSelector<MovieState>(
//   'movies'
// );
//
// export const getMoviesSelector = createSelector(
//   selectMovies,
//   selectIsLoading
// );
import * as fromReducers from '../reducers/movie.reducer';
import {createSelector} from '@ngrx/store';

export const getMoviesState = (state: any) => state.state;

export const getAllMovies = createSelector(getMoviesState, fromReducers.getMovies);
export const getMoviesLoading = createSelector(getMoviesState, fromReducers.getMoviesLoading);
export const getMoviesLoaded = createSelector(getMoviesState, fromReducers.getMoviesLoaded);
export const getMoviesError = createSelector(getMoviesState, fromReducers.getMoviesError);
