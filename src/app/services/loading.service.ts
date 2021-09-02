import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	public status$ = new BehaviorSubject(false);

	public constructor() {}

	public show(): void {
		this.status$.next(true);
	}

	public hide(): void {
		this.status$.next(false);
	}
}
