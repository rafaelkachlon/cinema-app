import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MoviesService} from '../movies.service';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie.model';
import {Store} from '@ngrx/store';
import {MovieState} from '../store/reducers/movie.reducer';
import * as fromSelectors from '../store/selectors/movie.selector';
import {LoadMovies} from '../store/actions/movie.actions';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoviesListComponent implements OnInit {

  selectedMovie: Movie;
  movies$: Observable<Movie[]>;
  getMoviesFail$: Observable<boolean>;
  showDialog: boolean;

  constructor(private movieService: MoviesService,
              private store: Store<MovieState>) {

  }

  ngOnInit(): void {
    this.movies$ = this.store.select(fromSelectors.getAllMovies);
    this.getMoviesFail$ = this.store.select(fromSelectors.getMoviesError);
    this.store.dispatch(new LoadMovies());
  }

  onOpenModal(movie: Movie): void {
    this.selectedMovie = movie;
    this.showDialog = true;
  }

  onAddUpdateSubmitted(event): void {
    console.log('event from movie list', event);

  }
}
