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
    public shouldShowPaginator = false;
    public searchBoxControl = new FormControl();
    public loading = true;
    public subscriptions: Subscription[] = [];
    public movies: ResultModel[] = [];
    public totalPagesCount = 0;
    public currentPage = 1;

    constructor(
        private loadingService: LoadingService,
        private httpService: HttpService
    ) { }

    public ngOnInit(): void {
        this.subscriptions = [this.loadingService.status$.pipe(debounceTime(0)).subscribe(
            (loading: boolean) => {
                this.loading = loading;
            })];
        this.getTopRatedMovies();
    }


    public ngAfterViewInit(): void {
        this.searchBoxControl.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
            if (value.length > 0) {
                this.httpService.search(value, 'movie').subscribe((data: ResponseDataModel) => {
                    if (data.results!.length > 0) {
                        this.movies = data.results!;
                        this.totalPagesCount = 0;
                        this.currentPage = 1;
                        this.shouldShowPaginator = false;
                    }
                })
            } else {
                this.getTopRatedMovies();
            }
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }

    private getTopRatedMovies(): void {
        this.httpService.getTopRated('movie', this.currentPage).subscribe((data: ResponseDataModel) => {
            this.movies = data.results!;
            this.shouldShowPaginator = true;
            this.totalPagesCount = data.total_pages < 50 ? data.total_pages : 50;
        })
    }

    public onPageChange(change: any): void {
        this.httpService.getTopRated('movie', change.page + 1).subscribe((data: ResponseDataModel) => {
            this.currentPage = change.page + 1;
            this.totalPagesCount = data.total_pages < 50 ? data.total_pages : 50;
            this.movies = data.results!;
        });
    }

}
