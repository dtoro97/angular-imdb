import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY, API_URL } from '../config';
import { ResponseDataModel } from '../models/response-data-model';
import { GenreDataModel } from '../models/genre-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

    public searchMovies(): Observable<ResponseDataModel> {
        return this.http.get<ResponseDataModel>(API_URL + '/search/movie', {
            params: {
                api_key: API_KEY,
                query: 'avengers',
            },
        });
    }

    public getMovieGenres(): Observable<GenreDataModel> {
        return this.http.get<GenreDataModel>(API_URL + '/genre/movie/list', {
            params: {
                api_key: API_KEY,
            },
        });
    }

    public getTvGenres(): Observable<GenreDataModel> {
        return this.http.get<GenreDataModel>(API_URL + '/genre/tv/list', {
            params: {
                api_key: API_KEY,
            },
        });
    }

    public getTrending(mediaType: string, timeWindow = 'day'): Observable<ResponseDataModel> {
        return this.http.get<ResponseDataModel>(`${API_URL}/trending/${mediaType}/${timeWindow}`, {
            params: {
                api_key: API_KEY,
            },
        });
    }

}
