import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMovieDB, MovieDetail, ResponseCredits } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const bearerToken = environment.bearerToken;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularsPage = 0;

  constructor( private http: HttpClient ) { }

  private executeQuery<T>( query: string ){
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + bearerToken
      })
    };
    query = URL + query;
    return this.http.get<T>(query, httpOptions);
  }

  getRecentMovies(){
    const day = new Date();
    const lastDay = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate();
    const month = day.getMonth() + 1;
    let monthString;

    if( month < 10 ){
      monthString = '0' + month;
    }else{
      monthString = month;
    }

    const startDate = `${day.getFullYear()}-${monthString}-01`;
    const endDate = `${day.getFullYear()}-${monthString}-${lastDay}`

    return this.executeQuery<ResponseMovieDB>(`/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`)
  }

  getPopularMovies(){
    this.popularsPage++;
    const query = `/discover/movie?sort_by=popularity.desc?page=${this.popularsPage}`;
    return this.executeQuery<ResponseMovieDB>(query);
  }

  getMovieDetail(id: number){
    return this.executeQuery<MovieDetail>(`/movie/${id}`);
  }

  getMovieActors(id: number){
    return this.executeQuery<ResponseCredits>(`/movie/${id}/credits?a=1`);
  }

  searchMovies( text: string) {
    return this.executeQuery(`/search/movie?query=${text}`);
  }
}
