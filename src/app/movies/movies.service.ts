import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {Genre, Movie, MovieResponse, MoviesResponse} from './models/movie.model';
import {delay, map, switchMap} from 'rxjs/operators';
import {MovieDetailsResponse} from './models/movie-details.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly key = 'b0b9386f19423835e626883809caf68a';
  private readonly baseUrl = 'https://api.themoviedb.org/3/';
  private readonly discoverUrl = 'discover/movie?language=en-US&sort_by=vote_count.desc&include_adult=true&include_video=false&page=1&api_key=';
  private readonly genresUrl = 'genre/movie/list?api_key=';
  private readonly movieDetailsUrl = 'movie/';
  private readonly imageUrl = 'https://image.tmdb.org/t/p/w185/';
  private genres: Genre[];

  constructor(private http: HttpClient) {
    this.getGenres().subscribe(res => this.genres = res);
  }

  get Genres(): Genre[] {
    return this.genres;
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get(`${this.baseUrl}${this.genresUrl}${this.key}`)
      .pipe(
        map((response: any) => response.genres)
      );

  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.http.get(`${this.baseUrl}${this.movieDetailsUrl}${movieId}?api_key=${this.key}`)
      .pipe(
        map((response: MovieDetailsResponse) => {
          const {id, genres, runtime, title, poster_path, vote_average, overview, release_date} = response;
          return {
            id,
            genres,
            runtime,
            title,
            overview,
            vote_average,
            release_date: new Date(release_date),
            poster_path: `${this.imageUrl}${poster_path}`
          } as Movie;
        })
      );
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get(`${this.baseUrl}${this.discoverUrl}${this.key}`)
      .pipe(
        map((response: MoviesResponse) => response.results),
        switchMap((response: MovieResponse[]) => {
          const obj = response.map(movie => this.getMovieDetails(movie.id));
          return forkJoin(obj);
        }),
        map((movies: Movie[]) => movies)
      );
  }

  createMovie(movie: Movie): Observable<Movie> {
    const add = {
      ...movie,
      poster_path: 'http://placeimg.com/185/285/Animals',
      vote_average: 5,
      id: Math.floor(Math.random() * 10)
    };

    return of(add).pipe(
      delay(500)
    );
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return of(movie).pipe(
      delay(500)
    );
  }

  removeMovie(movie: Movie): Observable<Movie> {
    return of(movie).pipe(
      delay(500)
    );
  }
}
