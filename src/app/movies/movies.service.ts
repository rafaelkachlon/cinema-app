import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Movie, MovieResponse, MoviesResponse} from './models/movie.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly key = '9ee82a95315c563b8d277066f4ee9201';
  private readonly url = 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=vote_count.desc&include_adult=true&include_video=false&page=1&api_key=';
  private readonly imageUrl = 'https://image.tmdb.org/t/p/w185/';

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get(`${this.url}${this.key}`)
      .pipe(
        map((response: MoviesResponse) => response.results),
        map((movies: MovieResponse[]) => {
          return movies.map(movie => {
            return {
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              poster_path: `${this.imageUrl}${movie.poster_path}`,
              release_date: new Date(movie.release_date),
              vote_average: movie.vote_average
            };
          });
        }),
        catchError(error => of(error.json()))
      );
  }
}
