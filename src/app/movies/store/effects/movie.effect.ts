import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  CREATE_MOVIE,
  CreateMovie,
  CreateMovieFail,
  CreateMovieSuccess,
  LOAD_MOVIES,
  LoadMoviesFail,
  LoadMoviesSuccess
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
}
