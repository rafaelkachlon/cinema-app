import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MoviesService} from '../movies.service';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie.model';
import {Store} from '@ngrx/store';
import {MovieState} from '../store/reducers/movie.reducer';
import * as fromSelectors from '../store/selectors/movie.selector';
import {CreateMovie, LoadMovies} from '../store/actions/movie.actions';
import {DialogService} from 'primeng/dynamicdialog';
import {MovieOverviewModalComponent} from '../movie-overview-modal/movie-overview-modal.component';
import {MovieAddUpdateModalComponent} from '../movie-add-update-modal/movie-add-update-modal.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService]
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  getMoviesFail$: Observable<boolean>;
  showDialog: boolean;

  constructor(private movieService: MoviesService,
              private store: Store<MovieState>,
              private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.movies$ = this.store.select(fromSelectors.getAllMovies);
    this.getMoviesFail$ = this.store.select(fromSelectors.getMoviesError);
    this.store.dispatch(new LoadMovies());
  }

  onOpenModal(movie: Movie): void {
    this.dialogService.open(MovieOverviewModalComponent, {
      data: movie
    });

    // test on create when selecting a movie
    if (!!movie) {
      this.onCreate(movie);
    }
  }

  onAdd(movie: Movie): void {
    this.dialogService.open(MovieAddUpdateModalComponent, {
      data: {
        movie
      }
    });
  }

  onCreate(movie: Movie): void {
    this.store.dispatch(new CreateMovie(movie));
  }

  onAddUpdateSubmitted(event): void {
    console.log('event from movie list', event);

  }
}
