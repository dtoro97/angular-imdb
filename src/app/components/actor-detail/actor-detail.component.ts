import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RESPONSIVE_OPTIONS } from 'src/app/config';
import { ActorDetails } from 'src/app/models/actor-details';
import { ResponseDataModel } from 'src/app/models/response-data-model';
import { ResultModel } from 'src/app/models/result-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-actor-detail',
	templateUrl: './actor-detail.component.html',
	styleUrls: ['./actor-detail.component.scss'],
})
export class ActorDetailComponent implements OnInit {
	public loading$: BehaviorSubject<boolean>;
	public actor?: ActorDetails;
	public movies?: ResultModel[] | null;
	public shows?: ResultModel[] | null;
	public responsiveOptions = RESPONSIVE_OPTIONS;

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private loadingService: LoadingService
	) {
		this.loading$ = this.loadingService.status$;
	}

	public ngOnInit(): void {
		this.route.params
			.pipe(
				switchMap(({ id }: any) => {
					return of(id);
				}),
				switchMap((id: number) => {
					return this.http.getActorDetails(id);
				}),
				switchMap((actor: ActorDetails) => {
					this.actor = actor;
					return forkJoin(
						this.http.getMoviesForActor(actor.id),
						this.http.getShowsForActor(actor.id)
					);
				})
			)
			.subscribe(([movies, shows]) => {
				this.movies = movies.results;
				this.shows = shows.results;
			});
	}

	public getAlsoKnownAs(): string | null {
		if (this.actor?.also_known_as && this.actor.also_known_as.length) {
			return this.actor.also_known_as[0];
		}
		return null;
	}

	public formatBiography(bio: string): string {
		return bio.split('.').slice(0, 10).join('.') + '.';
	}

	public getAvatarUrl(url: string | undefined | null): string {
		if (url) {
			return `https://image.tmdb.org/t/p/w500${url}`;
		}
		return 'http://placehold.jp/8a8a8a/fcfcfc/500x750.jpg?text=No%20Poster';
	}
}
