import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Movie, MovieResponse, MoviesResponse} from './models/movie.model';
import {catchError, delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly key = '9ee82a95315c563b8d277066f4ee9201';
  private readonly baseUrl = 'https://api.themoviedb.org/3/';
  private readonly discoverUrl = 'discover/movie?language=en-US&sort_by=vote_count.desc&include_adult=true&include_video=false&page=1&api_key=';
  // private readonly movieDetailsUrl = 'movie/';
  private readonly imageUrl = 'https://image.tmdb.org/t/p/w185/';

  // {movie_id}?api_key=<<api_key>>&language=en-US';

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get(`${this.baseUrl}${this.discoverUrl}${this.key}`)
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
            } as Movie;
          });
        }),
        catchError(error => of(error.json()))
      );
  }

  createMovie(movie: Movie): Observable<Movie> {
    return of(movie).pipe(
      delay(500)
    );
  }
}
