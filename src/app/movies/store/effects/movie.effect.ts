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
import {MessageService} from 'primeng/api';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions,
              private moviesService: MoviesService,
              private message: MessageService) {
  }


  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_MOVIES),
      switchMap(() => this.moviesService.getMovies()
        .pipe(
          map(movies => {
            this.message.add({
              severity: 'success', summary: 'Success', detail: 'Movies loaded successfully'
            });
            return new LoadMoviesSuccess(movies);
          }),
          catchError((error) => {
            this.message.add({
              severity: 'error', summary: 'Error', detail: 'Something is wrong with loading movies'
            });
            return of(new LoadMoviesFail(error));
          })
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
            map(createdMovie => {
              this.message.add({
                severity: 'success', summary: 'Success', detail: `${movie.title} has been created.`
              });
              return new CreateMovieSuccess(createdMovie);
            }),
            catchError(error => {
              this.message.add({
                severity: 'error', summary: 'Error', detail: 'Unable to create movie. Please try again'
              });
              return of(new CreateMovieFail(error));
            })
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
            map(updatedMovie => {
              this.message.add({
                severity: 'success', summary: 'Success', detail: `${movie.title} has been updated.`
              });
              return new UpdateMovieSuccess(updatedMovie);
            }),
            catchError(error => {
              this.message.add({
                severity: 'error', summary: 'Error', detail: 'Failed to update movie'
              });
              return of(new UpdateMovieFail(error));
            })
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
            map(removedMovie => {
              this.message.add({
                severity: 'success', summary: 'Success', detail: `${movie.title} has been removed`
              });
              return new RemoveMovieSuccess(removedMovie);
            }),
            catchError(error => {
              this.message.add({
                severity: 'error', summary: 'Error', detail: `Failed to remove ${movie.title}`
              });
              return of(new RemoveMovieFail(error));
            })
          );
      })
    );
  });
}
