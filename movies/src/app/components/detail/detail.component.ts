import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

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

  slideOptActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor( private moviesService: MoviesService, private modalCtrl: ModalController ) { }

  ngOnInit() {
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

  }
}
