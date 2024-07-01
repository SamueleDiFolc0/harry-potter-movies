import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { MoviesAPIService } from '../../services/movie-api.service';
import {
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { Movie } from '../../utils/model';
import { DurationPipe } from '../../utils/pipe/duration.pipe';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
    CurrencyPipe,
    DurationPipe,
    RouterModule
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
})
export class MoviesListComponent implements AfterViewInit, OnDestroy {
  moviesService = inject(MoviesAPIService);

  movies$: Observable<Movie[]> = this.moviesService.getMovies().pipe(
    tap((movies) => {
      this.moviesList = movies;
      this.filteredMoviesList = movies;
    })
  );
  moviesList: Movie[] = [];
  filteredMoviesList: Movie[] = [];
  titleValue: string = '';
  yearValue: number = 0;

  filterSubscription!: Subscription;

  filterForm: FormGroup<{
    title: FormControl<string | null>;
    year: FormControl<string | null>;
  }> = new FormGroup({
    title: new FormControl<string | null>(''),
    year: new FormControl<string | null>(''),
  });

  ngAfterViewInit() {
    this.filterSubscription = this.filterForm.valueChanges
    .pipe(
      tap((values) => {
        const title = values.title || '';
        const year = values.year ? values.year.toString() : '';

        let filteredMovieList = this.moviesList;

        if (title) {
          filteredMovieList = filteredMovieList.filter((movie) =>
            movie.title.toLowerCase().includes(title.toLowerCase())
          );
        }

        if (year && year.length === 4) {
          filteredMovieList = filteredMovieList.filter((movie) => {
            const movieYear = new Date(movie.release_date).getFullYear().toString();
            return movieYear === year;
          });
        }

        this.filteredMoviesList = filteredMovieList;
      })
    )
    .subscribe();
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
