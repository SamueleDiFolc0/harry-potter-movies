import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  RouterModule,
} from '@angular/router';
import { Movie, MovieDetails } from '../../utils/model';
import { MoviesAPIService } from '../../services/movie-api.service';
import { Observable } from 'rxjs';
import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  DatePipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { DurationPipe } from '../../utils/pipe/duration.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    NgFor,
    NgIf,
    DurationPipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movieId: string | null = null;
  movieDetails$!: Observable<MovieDetails>;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesAPIService
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.movieDetails$ = this.moviesService.getMovieByID(this.movieId);
    }
  }
}
