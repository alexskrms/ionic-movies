import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';
import { MovieDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  movies: MovieDetail[] = []
  
  constructor( private toastCtrl: ToastController ) { }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    })
    toast.present();
  }

  async saveMovie( movie: MovieDetail ){
    let exists = false;
    let message = '';

    for( const movieIterate of this.movies ){
      if( movieIterate.id === movie.id ){
        exists = true;
        break;
      }
    }

    if( exists ){
      this.movies = this.movies.filter( movi => movi.id !== movie.id );
      message = 'Removed from favorites';
      const moviesString = JSON.stringify(this.movies);
      await Storage.set({
        key: 'movies',
        value: moviesString
      });
    }else{
      this.movies.push( movie );
      const moviesString = JSON.stringify(this.movies);
      message = 'Added to favorites'
      await Storage.set({
        key: 'movies',
        value: moviesString
      });
    }
    this.presentToast(message);
    return !exists;
  }

  async loadMovies(){
    const moviesString = await Storage.get({ key: 'movies'});
    this.movies = JSON.parse(moviesString.value) || [];
    return this.movies;
  }

  async existMovie(id: number){
    await this.loadMovies();
    const exists = this.movies.find( movi => movi.id === id );
    return (exists? true: false);
  }
}