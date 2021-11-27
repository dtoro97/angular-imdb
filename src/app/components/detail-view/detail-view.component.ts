import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RESPONSIVE_OPTIONS } from 'src/app/config';
import {
	CastEntity,
	CastResponseData,
} from 'src/app/models/cast-response-data';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-detail-view',
	templateUrl: './detail-view.component.html',
	styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit, OnDestroy {
	public isMovies = true;
	public loading = true;
	public subscriptions: Subscription[] = [];
	public item?: any;
	public id!: number;
	public similar?: any[] = [];
	public responsiveOptions = RESPONSIVE_OPTIONS;
	public credits: CastEntity[] = [];

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private loadingService: LoadingService
	) {}

	ngOnInit(): void {
		this.subscriptions = [
			this.loadingService.status$
				.pipe(debounceTime(0))
				.subscribe((loading: boolean) => {
					this.loading = loading;
				}),
			this.route.params.subscribe((routeparams: any) => {
				const item = {
					id: Number(routeparams.id),
					type: String(routeparams.type),
				};
				this.isMovies = item.type === 'movie';
				this.loadData(item);
			}),
		];
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
	}

	public getBackgroundUrl(url: string | undefined | null): string {
		return `url('https://image.tmdb.org/t/p/original${url}')`;
	}

	public getPosterUrl(posterPath: string | null | undefined): string {
		if (posterPath) {
			return `https://image.tmdb.org/t/p/w500${posterPath}`;
		}
		return 'http://placehold.jp/8a8a8a/fcfcfc/500x750.jpg?text=No%20Poster';
	}

	public loadData(item: any): void {
		this.http.getDetails(item.type, item.id).subscribe((data: any) => {
			this.item = data;
			this.id = item.id;
			this.http.getSimilar(item.type, item.id).subscribe((data: any) => {
				this.similar = data.results!;
			});
		});
		this.http
			.getCredit(item.type, item.id)
			.subscribe((data: CastResponseData) => {
				this.credits = data.cast!;
			});
	}
}
