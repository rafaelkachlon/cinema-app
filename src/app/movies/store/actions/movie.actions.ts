import {Action} from '@ngrx/store';
import {Movie} from '../../models/movie.model';


// Load Movies Actions
export const LOAD_MOVIES = '[Movies] Load Movies';
export const LOAD_MOVIES_FAIL = '[Movies] Load Movies Fail';
export const LOAD_MOVIES_SUCCESS = '[Movies] Load Movies Success';

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

// Create Movie Actions
export const CREATE_MOVIE = '[Movies] Create Movie';
export const CREATE_MOVIE_FAIL = '[Movies] Create Movie Fail';
export const CREATE_MOVIE_SUCCESS = '[Movies] Create Movie Success';

export class CreateMovie implements Action {
  readonly type = CREATE_MOVIE;

  constructor(public payload: Movie) {
  }
}


export class CreateMovieFail implements Action {
  readonly type = CREATE_MOVIE_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateMovieSuccess implements Action {
  readonly type = CREATE_MOVIE_SUCCESS;

  constructor(public payload: Movie) {
  }
}

export type MoviesAction =
  LoadMovies
  | LoadMoviesFail
  | LoadMoviesSuccess
  | CreateMovie
  | CreateMovieFail
  | CreateMovieSuccess;

