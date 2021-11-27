import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
	public loading = false;
	public subscription = new Subscription();

	constructor(private loadingService: LoadingService) {}

	ngOnInit(): void {
		this.subscription = this.loadingService.status$.subscribe(
			(loading: boolean) => {
				this.loading = loading;
			}
		);
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
