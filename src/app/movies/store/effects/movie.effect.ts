import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LOAD_MOVIES, LoadMoviesFail, LoadMoviesSuccess} from '../actions/movie.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {MoviesService} from '../../movies.service';
import {of} from 'rxjs';

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
}
