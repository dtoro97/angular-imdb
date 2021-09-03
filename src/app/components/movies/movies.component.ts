import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ResponseDataModel } from 'src/app/models/response-data-model';
import { ResultModel } from 'src/app/models/result-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('searchBox') searchBox!: ElementRef;
    public searchBoxControl = new FormControl();
    public loading = true;
    public subscriptions: Subscription[] = [];
    public movies: ResultModel[] = [];
    public totalPagesCount = 0;

    constructor(
        private loadingService: LoadingService,
        private httpService: HttpService
    ) { }

    public ngOnInit(): void {
        this.subscriptions = [this.loadingService.status$.pipe(debounceTime(0)).subscribe(
            (loading: boolean) => {
                this.loading = loading;
            })];
        this.httpService.getTopRated('movie').subscribe((data: ResponseDataModel) => {
            this.movies = data.results!;
            this.totalPagesCount = data.total_pages < 50 ? data.total_pages : 50;
        })
    }


    public ngAfterViewInit(): void {
        this.searchBoxControl.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
            this.httpService.searchMovies(value).subscribe((data: ResponseDataModel) => {
                this.movies = data.results!;
                this.totalPagesCount = data.total_pages < 50 ? data.total_pages : 50;
            })
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }

    public getImgUrl(posterPath: string | null | undefined): string {
        if (posterPath) {
            return `https://image.tmdb.org/t/p/w500${posterPath}`;            
        }
        return 'https://via.placeholder.com/200x316?text=No+Preview'
    }

}
