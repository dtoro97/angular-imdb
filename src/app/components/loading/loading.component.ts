import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    public loading = false;
    public subscription = new Subscription();

    constructor(private loadingService: LoadingService) { }

    ngOnInit(): void {
        this.subscription = this.loadingService.status$.pipe(debounceTime(0)).subscribe(
            (loading: boolean) => {
                this.loading = loading;
            }
        );
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
