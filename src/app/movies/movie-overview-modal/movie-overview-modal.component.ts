import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Movie} from '../models/movie.model';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {Store} from '@ngrx/store';
import {RemoveMovie} from '../store/actions/movie.actions';

@Component({
  selector: 'app-movie-overview-modal',
  templateUrl: './movie-overview-modal.component.html',
  styleUrls: ['./movie-overview-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService]
})
export class MovieOverviewModalComponent implements OnInit {
  selectedMovie: Movie;

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private confirmation: ConfirmationService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.selectedMovie = this.config.data;
  }

  editMovie(): void {
    this.ref.close(this.selectedMovie);
  }

  removeMovie(): void {
    this.confirmation.confirm({
      message: `Are you sure that you want to remove "${this.selectedMovie.title}"?`,
      accept: () => {
        // dispatch a remove action
        this.store.dispatch(new RemoveMovie(this.selectedMovie));
        this.ref.close();
      }
    });
  }
}
