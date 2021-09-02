import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Genre, GenreDataModel } from 'src/app/models/genre-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-genres',
    templateUrl: './genres.component.html',
    styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
    public loading = true;
    public movieGenres: Genre[] = [];
    public tvGenres: Genre[] = [];
    private subscription: Subscription = new Subscription();

    constructor(
        private httpService: HttpService,
        private loadingService: LoadingService
        ) { 
            this.loadingService.status$.pipe(debounceTime(0)).subscribe(
                (loading: boolean) => {
                    this.loading = loading;
                }
            );
        }

    public ngOnInit(): void {
        this.httpService.getTvGenres().subscribe((data: GenreDataModel) => this.tvGenres = data.genres);
        this.httpService.getMovieGenres().subscribe((data: GenreDataModel) => this.movieGenres = data.genres);
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
