import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Movie } from '../movies/movie.model';

@Injectable()
export class MovieService {
  private url = 'http://www.omdbapi.com/?apikey=966c4f4f';

  constructor(private http: HttpClient) { }

  searchMovies(title: string, year: string, plot : 'short' | 'full'): Observable<Movie[]> {
    return this.http.get<any>(`${this.url}&s=${title}&y=${year}&page=1`).pipe(
      map(response => {
        if (response.Response === 'False') {
          console.error(response.Error);
          return [];
        }
        return response.Search;
      }),
      switchMap(movies => {
        const requests = movies.map((movie: any) => this.http.get<any>(`${this.url}&i=${movie.imdbID}&plot=${plot}`));
        return forkJoin(requests);
      }),
      map((movies : any) => movies.map((movie: any) => new Movie(movie.Title, movie.Year, movie.Poster, movie.Plot)))
    );
  }
}