import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  movies: MovieDetail[] = []
  
  constructor( private storage: Storage) { }

  saveMovie( movie: MovieDetail ){

  }
}
