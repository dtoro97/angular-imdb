import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genre, GenreDataModel } from 'src/app/models/genre-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-genres',
	templateUrl: './genres.component.html',
	styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit, OnDestroy {
	public loading = true;
	public movieGenres: Genre[] = [];
	public tvGenres: Genre[] = [];
	private subscription: Subscription = new Subscription();

	constructor(
		private httpService: HttpService,
		private loadingService: LoadingService,
		private router: Router
	) {
		this.loadingService.status$.subscribe((loading: boolean) => {
			this.loading = loading;
		});
	}

	public ngOnInit(): void {
		this.httpService.getMovieGenres().subscribe((data: GenreDataModel) => {
			this.tvGenres = data.genres;
			this.movieGenres = data.genres;
		});
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
