import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input() public item?: any;
	@Input() public type?: string;
	@Input() public isPerson = false;

	constructor() {}

	public getImgUrl(posterPath: string | null | undefined): string {
		if (posterPath) {
			return `https://image.tmdb.org/t/p/w500${posterPath}`;
		}
		return 'http://placehold.jp/8a8a8a/fcfcfc/500x750.jpg?text=No%20Poster';
	}
}
