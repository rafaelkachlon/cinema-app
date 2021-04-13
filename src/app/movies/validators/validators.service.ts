import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie.model';
import {Store} from '@ngrx/store';
import * as fromSelectors from '../store/selectors/movie.selector';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  movies$: Observable<Movie[]>;

  constructor(private store: Store) {
    this.movies$ = this.store.select(fromSelectors.getAllMovies);
  }

  CheckDate(control: AbstractControl): { invalidDate: boolean } {
    return isNaN(Date.parse(control.value.toString())) ? {invalidDate: true} : null;
  }

  CheckIfTitleExists(control: AbstractControl): any {
    return this.movies$.pipe(
      take(1),
      map((movies: Movie[]) => {
        const exists = movies.some(x => x.title.toLowerCase() === control.value.toLowerCase());
        return exists ? {titleExists: true} : null;
      })
    );
  }
}
