import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id;

  movie: MovieDetail = {};
  actors: Cast[] = [];
  hidden: number = 150;
  star = 'star-outline';

  slideOptActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor( private moviesService: MoviesService, private modalCtrl: ModalController, private localData: LocalDataService ) { }

  ngOnInit() {
    this.localData.existMovie( this.id ).then( exists => this.star = (exists) ? 'star': 'star-outline');

    this.moviesService.getMovieDetail(this.id).subscribe( response => {
      this.movie = response;
    });

    this.moviesService.getMovieActors(this.id).subscribe( response => {
      this.actors = response.cast;
    });
  }

  goBack(){
    this.modalCtrl.dismiss();
  }

  favorite(){
    this.localData.saveMovie(this.movie).then( exists => this.star = (exists) ? 'star': 'star-outline');
  }
}
