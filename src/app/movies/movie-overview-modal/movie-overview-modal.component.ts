import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../models/movie.model';

@Component({
  selector: 'app-movie-overview-modal',
  templateUrl: './movie-overview-modal.component.html',
  styleUrls: ['./movie-overview-modal.component.scss']
})
export class MovieOverviewModalComponent implements OnInit {

  @Input()
  selectedMovie: Movie;

  constructor() {
  }

  ngOnInit(): void {
  }

}
