import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RESPONSIVE_OPTIONS } from 'src/app/config';
import { CastEntity, CastResponseData } from 'src/app/models/cast-response-data';
import { MovieDetails } from 'src/app/models/movie-details';
import { ResponseDataModel } from 'src/app/models/response-data-model';
import { ResultModel } from 'src/app/models/result-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

    public loading = true;
    public item?: MovieDetails;
    public id!: number;
    public similarMovies?: ResultModel[];
    public responsiveOptions = RESPONSIVE_OPTIONS;
    public credits: CastEntity[] = [];
    private sub = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        private loadingService: LoadingService
        ) { }

    ngOnInit(): void {
        this.sub = this.loadingService.status$.pipe(debounceTime(0)).subscribe(
            (loading: boolean) => {
                this.loading = loading;
            });
        this.route.params.subscribe((routeparams: any) => {
            const item = {
                id: Number(routeparams.id),
                type: String(routeparams.type)
            };
            this.http.getMovieDetails(item.id).subscribe((data: MovieDetails) => {
                this.item = data;
                this.id = item.id;
                this.getSimilarMovies();
                this.http.getCreditByMovie(item.id).subscribe((data: CastResponseData) => {
                    this.credits = data.cast!;
                })
            });
        })

    }

    public getBackgroundUrl(url: string | undefined | null): string {
        return `url('https://image.tmdb.org/t/p/original${url}')`;
    }

    public getPosterUrl(posterPath: string | null | undefined): string {
        if (posterPath) {
            return `https://image.tmdb.org/t/p/w500${posterPath}`;            
        }
        return 'http://placehold.jp/8a8a8a/fcfcfc/500x750.jpg?text=No%20Poster'
    }

    public getSimilarMovies(): void {
        this.http.getSimilarMovies(this.id).subscribe((data: ResponseDataModel) => {
            if (data.results) {
                this.similarMovies = data.results;
            }
        })
    }
    
    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
