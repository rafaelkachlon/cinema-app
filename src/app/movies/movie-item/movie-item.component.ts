import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent implements OnInit {

  @Input()
  movie: Movie;

  @Output() openModal = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  readMore(): void {
    this.openModal.emit(this.movie);
  }
}
