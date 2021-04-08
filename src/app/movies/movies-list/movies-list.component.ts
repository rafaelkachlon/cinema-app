import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MoviesService} from '../movies.service';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoviesListComponent implements OnInit {

  movies$: Observable<Movie[]>;
  selectedMovie: Movie;
  showDialog: boolean;

  constructor(private movieService: MoviesService) {

  }

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }

  onOpenModal(movie: Movie): void {
    this.selectedMovie = movie;
    this.showDialog = true;
  }
}
