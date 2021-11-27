import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { ResponseDataModel } from 'src/app/models/response-data-model';
import { ResultModel } from 'src/app/models/result-model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-top-rated',
	templateUrl: './top-rated.component.html',
	styleUrls: ['./top-rated.component.scss'],
})
export class TopRatedComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('searchBox') searchBox!: ElementRef;
	@Input() public type: string = '';
	public shouldShowPaginator = false;
	public searchBoxControl = new FormControl();
	public loading$: BehaviorSubject<boolean>;
	public subscriptions: Subscription[] = [];
	public items: ResultModel[] = [];
	public totalPagesCount = 0;
	public currentPage = 1;

	constructor(
		private loadingService: LoadingService,
		private httpService: HttpService,
		private route: ActivatedRoute
	) {
		this.loading$ = this.loadingService.status$;
	}

	ngOnInit(): void {
		this.subscriptions = [
			this.route.params.subscribe((routeParams: any) => {
				this.type = routeParams.type;
				this.getTopRated();
			}),
		];
	}

	public ngAfterViewInit(): void {
		this.searchBoxControl.valueChanges
			.pipe(debounceTime(500))
			.subscribe((value: any) => {
				if (value.length > 0) {
					this.httpService
						.search(value, this.type)
						.pipe(
							filter((data: ResponseDataModel) => Boolean(data.results!.length))
						)
						.subscribe((data: ResponseDataModel) => {
							this.items = data.results!;
							this.totalPagesCount = 0;
							this.currentPage = 1;
							this.shouldShowPaginator = false;
						});
				} else {
					this.getTopRated();
				}
			});
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
	}

	private getTopRated(): void {
		this.httpService
			.getTopRated(this.type, this.currentPage)
			.subscribe((data: ResponseDataModel) => {
				this.items = data.results!;
				this.shouldShowPaginator = true;
				this.totalPagesCount = data.total_pages < 50 ? data.total_pages : 50;
			});
	}

	public onPageChange(change: any): void {
		this.httpService
			.getTopRated(this.type, change.page + 1)
			.subscribe((data: ResponseDataModel) => {
				this.currentPage = change.page + 1;
				this.totalPagesCount = data.total_pages < 50 ? data.total_pages : 50;
				this.items = data.results!;
			});
	}
}
