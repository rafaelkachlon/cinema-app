import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MoviesService} from '../movies.service';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie.model';
import {Store} from '@ngrx/store';
import {MovieState} from '../store/reducers/movie.reducer';
import * as fromSelectors from '../store/selectors/movie.selector';
import {CreateMovie, LoadMovies, UpdateMovie} from '../store/actions/movie.actions';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MovieOverviewModalComponent} from '../movie-overview-modal/movie-overview-modal.component';
import {MovieAddUpdateModalComponent} from '../movie-add-update-modal/movie-add-update-modal.component';
import {ModalMode} from '../models/modal-mode.enum';

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
    const overviewRef = this.dialogService.open(MovieOverviewModalComponent, {
      data: movie
    });
    overviewRef.onClose.subscribe(movieToUpdate => {
      if (movieToUpdate) {
        const addUpdateRef = this.openCreateUpdateDialog(movie, ModalMode.Update);

        addUpdateRef.onClose.subscribe(updatedMovie => {
          if (updatedMovie) {
            const {title, overview, release_date} = updatedMovie;
            const updated = {...movie, title, overview, release_date};
            this.store.dispatch(new UpdateMovie(updated));
          }
        });
      }
    });
  }


  onCreate(movie: Movie): void {
    const ref = this.openCreateUpdateDialog(movie, ModalMode.Create);
    ref.onClose.subscribe(createdMovie => {
      const obj: Movie = {
        id: null,
        title: createdMovie.title,
        overview: createdMovie.description,
        poster_path: null,
        release_date: createdMovie.publishDate,
        vote_average: null
      };
      this.store.dispatch(new CreateMovie(obj));
    });
  }

  openCreateUpdateDialog(movie: Movie, mode: ModalMode): DynamicDialogRef {
    return this.dialogService.open(MovieAddUpdateModalComponent, {
      data: {
        movie,
        mode
      },
      contentStyle: {
        overflow: 'visible'
      }
    });
  }

  onAddUpdateSubmitted(event): void {
    console.log('event from movie list', event);

  }
}
