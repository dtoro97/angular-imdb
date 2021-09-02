import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ResponseDataModel } from 'src/app/models/response-data-model';
import { ResultModel } from 'src/app/models/result-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public responsiveOptions: any[] = [];
    public loading = true;
    public trendingMovies?: ResultModel[] | null;
    public trendingTvShows?: ResultModel[] | null; 
    private subscriptions: Subscription[] = [];

    constructor(
        private httpService: HttpService,
        private loadingService: LoadingService
        ) {
            this.responsiveOptions = [
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
            this.subscriptions = [this.loadingService.status$.pipe(debounceTime(0)).subscribe(
                (loading: boolean) => {
                    this.loading = loading;
                })];


        }

    ngOnInit(): void {
        this.httpService.getTrending('movie').subscribe((data: ResponseDataModel) => {
            this.trendingMovies = data.results;
        })
        this.httpService.getTrending('tv').subscribe((data: ResponseDataModel) => {
            this.trendingTvShows = data.results;
        })
    }

    public getImgUrl(posterPath: string | null | undefined): string {
        if (posterPath) {
            return `https://image.tmdb.org/t/p/w500${posterPath}`;            
        }
        return 'https://via.placeholder.com/200x316?text=No+Preview'
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }

}
