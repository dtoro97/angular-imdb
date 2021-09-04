import { Component, Input, OnInit } from '@angular/core';
import { ResultModel } from 'src/app/models/result-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() public item?: ResultModel;
    @Input() public type?: string;
    constructor() { }

    ngOnInit(): void {
    }

    public getImgUrl(posterPath: string | null | undefined): string {
        if (posterPath) {
            return `https://image.tmdb.org/t/p/w500${posterPath}`;            
        }
        return 'http://placehold.jp/8a8a8a/fcfcfc/500x750.jpg?text=No%20Poster'
    }

}
