import { Component, OnInit } from '@angular/core';
import { MovieDetail, Genre } from '../interfaces/interfaces';
import { LocalDataService } from '../services/local-data.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: MovieDetail[] = [];
  genres: Genre[] = [];

  favoriteGenre: any[] = [];

  constructor( private localData: LocalDataService, private moviesService: MoviesService ) {}

  async ionViewWillEnter() {
    this.movies = await this.localData.loadMovies();
    this.moviesService.loadGenres().subscribe( response => {
      this.genres = response.genres;
      this.moviesByGenre( this.genres, this.movies );
    });
  }

  moviesByGenre( genresReceived: Genre[], moviesReceived: MovieDetail[]){
    this.favoriteGenre = [];
    genresReceived.forEach( genre => {
      this.favoriteGenre.push({
        genre: genre.name,
        movies: moviesReceived.filter( movi => {
          return movi.genres.find( genre2 => genre2.id === genre.id );
        } )
      })
    });
  }
}