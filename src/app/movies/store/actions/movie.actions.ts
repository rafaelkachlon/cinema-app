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

// Update Movie actions
export const UPDATE_MOVIE = '[Movies] Update Movie';
export const UPDATE_MOVIE_FAIL = '[Movies] Update Movie Fail';
export const UPDATE_MOVIE_SUCCESS = '[Movies] Update Movie Success';

export class UpdateMovie implements Action {
  readonly type = UPDATE_MOVIE;

  constructor(public payload: Movie) {
  }
}


export class UpdateMovieFail implements Action {
  readonly type = UPDATE_MOVIE_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateMovieSuccess implements Action {
  readonly type = UPDATE_MOVIE_SUCCESS;

  constructor(public payload: Movie) {
  }
}

// Remove Movie actions
export const REMOVE_MOVIE = '[Movies] Remove Movie';
export const REMOVE_MOVIE_FAIL = '[Movies] Remove Movie Fail';
export const REMOVE_MOVIE_SUCCESS = '[Movies] Remove Movie Success';

export class RemoveMovie implements Action {
  readonly type = REMOVE_MOVIE;

  constructor(public payload: Movie) {
  }
}


export class RemoveMovieFail implements Action {
  readonly type = REMOVE_MOVIE_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveMovieSuccess implements Action {
  readonly type = REMOVE_MOVIE_SUCCESS;

  constructor(public payload: Movie) {
  }
}


export type MoviesAction =
  LoadMovies
  | LoadMoviesFail
  | LoadMoviesSuccess
  | CreateMovie
  | CreateMovieFail
  | CreateMovieSuccess
  | UpdateMovie
  | UpdateMovieSuccess
  | UpdateMovieFail
  | RemoveMovie
  | RemoveMovieSuccess
  | RemoveMovieFail;

