import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieDetails } from '../utils/model';

@Injectable({
  providedIn: 'root',
})
export class MoviesAPIService {
  private http = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/movies');
  }

  getMovieByID(id: string): Observable<MovieDetails>{
    return this.http.get<MovieDetails>(`movies/${id}`)
  }
}
