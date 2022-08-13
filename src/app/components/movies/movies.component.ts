import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  searchUrl="https://api.themoviedb.org/3/search/movie?api_key=68b4fe2a513155a58dd0af4adacb281b";
  url = "https://api.themoviedb.org/3/discover/movie?api_key=68b4fe2a513155a58dd0af4adacb281b";
  genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=68b4fe2a513155a58dd0af4adacb281b&language=en-US";
  moviesList: any = [];
  genreList: any;
  searchKey: any = null;
  currentPage: any = 1;
  totalPages: any;
  sort_by: any = 'popularity.desc';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getMoviesList(this.url);
    this.getGenreList();
  }

  getMoviesList(url: any) {
    if(this.sort_by && !this.searchKey){
      url+=`&sort_by=${this.sort_by}`;
    }
    this.http.get(url+`&page=${this.currentPage}`).subscribe( (data:any)=>{
      this.moviesList = [...this.moviesList,...data.results];
      this.totalPages = data.total_pages;
    })
  }

  getGenreList() {
    this.http.get(this.genreUrl).subscribe( (data:any)=>{
      this.genreList = data.genres;
    })
  }

  sortMovies() {
    this.moviesList = [];
    this.totalPages = 0;
    this.currentPage = 1;
    this.searchKey = null;
    this.getMoviesList(this.url);
  }

  searchMovies() {
    this.moviesList = [];
    this.totalPages = 0;
    this.currentPage = 1;
    this.sort_by = null;
    if(this.searchKey && this.searchKey != ''){
      this.getMoviesList(this.searchUrl+`&query=${this.searchKey}`);
    }
    else{
      this.sort_by = 'popularity.desc';
      this.getMoviesList(this.url);
    }
  }

  onScroll() {
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      if(this.searchKey && this.searchKey != ''){
        this.sort_by = null;
        this.getMoviesList(this.searchUrl+`&query=${this.searchKey}`);
      }
      else{
        this.getMoviesList(this.url);
      }
    } 
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
