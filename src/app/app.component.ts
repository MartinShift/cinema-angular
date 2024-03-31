import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MovieService } from './services/movie.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Movie } from './movies/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  providers: [MovieService],
  imports: [MoviesComponent, CommonModule, FormsModule],
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {
  title: string;
  year: string;
  plot: 'short' | 'full';
  movies: Movie[];
  years: number[] = Array(125).fill(0).map((x,i)=>i+1900).reverse();
  debounce: any;

  constructor(private movieService: MovieService) {
    this.title = '';
    this.year = '2006';
    this.plot = 'short';
    this.movies = [];
  }

  getMovies(): void {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this.movieService.searchMovies(this.title, this.year, this.plot).subscribe(response => this.movies = response);
    }, 500);
  }
}