import { Component } from '@angular/core';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  searchText = '';
  searching = false;
  movies: Movie[] = [];
  suggested: string[] = ['Spiderman', 'Avengers', 'Antman', 'Venom']

  constructor( private movieService: MoviesService, private modalCtrl: ModalController ) {}

  search( event ){
    this.searching = true;
    const value: string = event.detail.value;
    if(value.length === 0){
      this.searching = false;
      this.movies = [];
      return;
    }
    this.movieService.searchMovies(value).subscribe( response => {
      this.movies = response['results'];
      this.searching = false;
    })
  }

  async showDetail( id: number ){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}