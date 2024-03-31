import { Component, Input } from '@angular/core';
import { Movie } from './movie.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  standalone: true,
  styleUrls: ['./movies.component.css'],
  styles: [],
  imports: [FormsModule, NgIf]
})
export class MoviesComponent {
  @Input() movie: Movie;

  constructor() { this.movie = new Movie('','','',''); }
}