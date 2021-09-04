import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
    public sub = new Subscription();
    public item?: MovieDetails;
    public id!: number;
    public similarMovies?: ResultModel[];
    public responsiveOptions = [
        {
            breakpoint: '1600px',
            numVisible: 5,
            numScroll: 5
        },
        {
            breakpoint: '1500px',
            numVisible: 4,
            numScroll: 4
        },
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '920px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '540px',
            numVisible: 1,
            numScroll: 1
        }
    ];

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
            });
        })

    }

    public getBackgroundUrl(url: string | undefined | null): string {
        return `url('https://image.tmdb.org/t/p/original${url}')`;
    }

    public getSimilarMovies(): void {
        this.http.getSimilarMovies(this.id).subscribe((data: ResponseDataModel) => {
            if (data.results) {
                this.similarMovies = data.results;
            }
        })
    }

}
