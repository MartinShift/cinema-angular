export class Movie {
    name: string;
    released: string;
    poster: string;
    plot: string;
  
    constructor(name: string, released: string, poster: string, plot: string) {
      this.name = name;
      this.released = released;
      this.poster = poster;
      this.plot = plot;
    }
  }