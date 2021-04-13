import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Movie} from '../models/movie.model';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-movie-overview-modal',
  templateUrl: './movie-overview-modal.component.html',
  styleUrls: ['./movie-overview-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieOverviewModalComponent implements OnInit {
  selectedMovie: Movie;

  constructor(private config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.selectedMovie = this.config.data;
  }
}
