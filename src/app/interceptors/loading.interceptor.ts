import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	private requests: HttpRequest<any>[] = [];

    public constructor(private loadingService: LoadingService) { }

	public removeRequest(req: HttpRequest<any>): void {
		const i = this.requests.indexOf(req);
		if (i >= 0) {
			this.requests.splice(i, 1);
		}
		if (this.requests.length === 0) {
			setTimeout(() => {
                this.loadingService.hide();
            }, 1000);
		}
	}

	public intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		this.requests.push(request);
		if (this.requests.length === 1) {
			this.loadingService.show();
		}
		return Observable.create((observer: any) => {
			const subscription = next.handle(request).subscribe(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						this.removeRequest(request);
						observer.next(event);
					}
				},
				(error: any) => {
					this.removeRequest(request);
					observer.error(error);
				},
				() => {
					this.removeRequest(request);
					observer.complete();
				}
			);
			return () => {
				this.removeRequest(request);
				subscription.unsubscribe();
			};
		});
	}
}
