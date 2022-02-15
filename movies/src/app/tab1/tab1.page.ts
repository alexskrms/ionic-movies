import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recentMovies: Movie[] = [];
  popularMovies: Movie[] = [];

  constructor( private moviesService: MoviesService ) {}

  ngOnInit() {
      this.moviesService.getRecentMovies().subscribe( response => {
        this.recentMovies = response.results;
      } );

      this.getPopularMovies();
  }

  loadMore(){
    this.getPopularMovies();
  }

  getPopularMovies(){
    this.moviesService.getPopularMovies().subscribe( response => {
      const tempMovies = [...this.popularMovies, ...response.results];
      this.popularMovies = tempMovies;
    })
  }
}