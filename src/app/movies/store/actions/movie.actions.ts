import {Action, createAction, props} from '@ngrx/store';
import {Movie} from '../../models/movie.model';

export const LOAD_MOVIES = '[Movies] Load Movies';
export const LOAD_MOVIES_FAIL = '[Movies] Load Movies Fail';
export const LOAD_MOVIES_SUCCESS = '[Movies] Load Movies Success';


export const loadMovies = createAction(
  LOAD_MOVIES
);
export const loadMoviesSuccess = createAction(
  LOAD_MOVIES_SUCCESS,
  props<{ movies: Movie[] }>()
);
export const loadMoviesFail = createAction(
  LOAD_MOVIES_FAIL
);

export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
}

export class LoadMoviesFail implements Action {
  readonly type = LOAD_MOVIES_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadMoviesSuccess implements Action {
  readonly type = LOAD_MOVIES_SUCCESS;

  constructor(public payload: Movie[]) {
  }
}

export type MoviesAction = LoadMovies | LoadMoviesFail | LoadMoviesSuccess;

