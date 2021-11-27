import { Component, Input } from '@angular/core';
import { ResultModel } from 'src/app/models/result-model';

@Component({
	selector: 'app-card-grid',
	templateUrl: './card-grid.component.html',
	styleUrls: ['./card-grid.component.scss'],
})
export class CardGridComponent {
	@Input() public type?: string;
	@Input() public items?: ResultModel[];
}
