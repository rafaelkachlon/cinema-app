import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MoviesListComponent} from './movies/movies-list/movies-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cinemaApp';
  show: boolean;

  @ViewChild(MoviesListComponent) movies: MoviesListComponent;

  ngAfterViewInit(): void {
    console.log('movies component: ', this.movies);
  }

  openModal(): void {
    this.movies.onOpenModal(null);
  }
}

