import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RESPONSIVE_OPTIONS } from 'src/app/config';
import { ActorDetails } from 'src/app/models/actor-details';
import { ResponseDataModel } from 'src/app/models/response-data-model';
import { ResultModel } from 'src/app/models/result-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit {
    public loading = false;
    public actor?: ActorDetails;
    public movies?: ResultModel[] | null;
    public shows?: ResultModel[] | null;
    public responsiveOptions = RESPONSIVE_OPTIONS;
    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        private loadingService: LoadingService
    ) { }

    public ngOnInit(): void {
        this.subscriptions = [this.loadingService.status$.pipe(debounceTime(0)).subscribe(
            (loading: boolean) => {
                this.loading = loading;
            }),
        this.route.params.subscribe((routeparams: any) => {
            this.http.getActorDetails(routeparams.id).subscribe((data: ActorDetails) => {
                this.actor = data;
                this.http.getMoviesForActor(this.actor.id).subscribe((data: ResponseDataModel) => {
                   this.movies = data.results;
                });
                this.http.getShowsForActor(this.actor.id).subscribe((data: ResponseDataModel) => {
                    this.shows = data.results;
                });
            });
        })];
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }

    public getAlsoKnownAs(): string | null{
        if (this.actor?.also_known_as && this.actor.also_known_as.length > 0) {
            return this.actor.also_known_as[0];
        }
        return null;
    }

    public getAvatarUrl(url: string | undefined | null): string {
        if (url) {
            return `https://image.tmdb.org/t/p/w500${url}`;            
        }
        return 'http://placehold.jp/8a8a8a/fcfcfc/500x750.jpg?text=No%20Poster'
    }

}
