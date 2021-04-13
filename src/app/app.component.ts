import {Component, ViewChild} from '@angular/core';
import {MoviesListComponent} from './movies/movies-list/movies-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cinemaApp';
  show: boolean;

  @ViewChild(MoviesListComponent) movies: MoviesListComponent;


  openModal(): void {
    this.movies.onCreate(null);
  }
}

