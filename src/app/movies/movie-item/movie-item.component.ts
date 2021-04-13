import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Movie} from '../models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent {

  @Input()
  movie: Movie;

  @Output() openModal = new EventEmitter<any>();


  readMore(): void {
    this.openModal.emit(this.movie);
  }
}
