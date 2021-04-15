import * as fromReducers from '../reducers/movie.reducer';
import {createSelector} from '@ngrx/store';

export const getMoviesState = (state: any) => state.state;

export const getAllMovies = createSelector(getMoviesState, fromReducers.getMovies);
export const getMoviesLoading = createSelector(getMoviesState, fromReducers.getMoviesLoading);
export const getMoviesLoaded = createSelector(getMoviesState, fromReducers.getMoviesLoaded);
export const getMoviesError = createSelector(getMoviesState, fromReducers.getMoviesError);
