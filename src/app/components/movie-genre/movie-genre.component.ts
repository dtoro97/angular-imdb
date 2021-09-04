import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Genre } from 'src/app/models/genre-model';
import { ResponseDataModel } from 'src/app/models/response-data-model';
import { ResultModel } from 'src/app/models/result-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-movie-genre',
    templateUrl: './movie-genre.component.html',
    styleUrls: ['./movie-genre.component.scss']
  })
  export class MovieGenreComponent implements OnInit, OnDestroy {
    public loading = true;
    public genre: Genre | undefined;
    public sub = new Subscription();
    public movies: ResultModel[] = [];
    public shows: ResultModel[] = [];

    constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        private loadingService: LoadingService
        ) { }

    public ngOnInit(): void {
        this.sub = this.loadingService.status$.pipe(debounceTime(0)).subscribe(
            (loading: boolean) => {
                this.loading = loading;
            });
        const genre: Genre = {
            id: Number(this.route.snapshot.paramMap.get('id')),
            name: String(this.route.snapshot.paramMap.get('name'))
        };
        this.genre = genre;
        this.http.getMoviesByGenre(this.genre.id).subscribe((data: ResponseDataModel) => {
            this.movies = data.results!;
        });
        this.http.getShowsByGenre(this.genre.id).subscribe((data: ResponseDataModel) => {
            this.shows = data.results!;
        });
        
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
