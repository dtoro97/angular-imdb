import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ResponseDataModel } from 'src/app/models/response-data-model';
import { ResultModel } from 'src/app/models/result-model';
import { TvDetails } from 'src/app/models/tv-details';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {
    public loading = true;
    public sub = new Subscription();
    public item?: TvDetails;
    public id!: number;
    public similarShows?: ResultModel[];
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
            this.http.getTvDetails(item.id).subscribe((data: TvDetails) => {
                console.log(data);
                this.item = data;
                this.id = item.id;
                this.getSimilarShows();
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

    public getSimilarShows(): void {
        this.http.getSimilarShows(this.id).subscribe((data: ResponseDataModel) => {
            if (data.results) {
                this.similarShows = data.results;
            }
        })
    }
}
