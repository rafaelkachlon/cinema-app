import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  CREATE_MOVIE,
  CreateMovie,
  CreateMovieFail,
  CreateMovieSuccess,
  LOAD_MOVIES,
  LoadMoviesFail,
  LoadMoviesSuccess,
  REMOVE_MOVIE,
  RemoveMovie,
  RemoveMovieFail,
  RemoveMovieSuccess,
  UPDATE_MOVIE,
  UpdateMovie,
  UpdateMovieFail,
  UpdateMovieSuccess
} from '../actions/movie.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {MoviesService} from '../../movies.service';
import {of} from 'rxjs';
import {Movie} from '../../models/movie.model';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions,
              private moviesService: MoviesService) {
  }


  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_MOVIES),
      switchMap(() => this.moviesService.getMovies()
        .pipe(
          map(movies => new LoadMoviesSuccess(movies)),
          catchError((error) => of(new LoadMoviesFail(error)))
        ))
    );
  });

  createMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CREATE_MOVIE),
      map((action: CreateMovie) => action.payload),
      switchMap((movie: Movie) => {
        return this.moviesService.createMovie(movie)
          .pipe(
            map(createdMovie => new CreateMovieSuccess(createdMovie)),
            catchError(error => of(new CreateMovieFail(error)))
          );
      })
    );
  });

  updateMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UPDATE_MOVIE),
      map((action: UpdateMovie) => action.payload),
      switchMap((movie: Movie) => {
        return this.moviesService.updateMovie(movie)
          .pipe(
            map(updatedMovie => new UpdateMovieSuccess(updatedMovie)),
            catchError(error => of(new UpdateMovieFail(error)))
          );
      })
    );
  });

  removeMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_MOVIE),
      map((action: RemoveMovie) => action.payload),
      switchMap(movie => {
        return this.moviesService.removeMovie(movie)
          .pipe(
            map(removedMovie => new RemoveMovieSuccess(removedMovie)),
            catchError(error => of(new RemoveMovieFail(error)))
          );
      })
    );
  });
}
