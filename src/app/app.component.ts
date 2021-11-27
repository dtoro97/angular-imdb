import { AfterViewInit, Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	public loading = true;

	constructor() {}

	public ngAfterViewInit(): void {
		let resizeTimer: any;
		window.addEventListener('resize', () => {
			document.body.classList.add('resize-animation-stopper');
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				document.body.classList.remove('resize-animation-stopper');
			}, 400);
		});
	}
}
