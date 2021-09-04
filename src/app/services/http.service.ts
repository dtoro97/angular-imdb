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

    public search(query: string, type: string): Observable<ResponseDataModel> {
        return this.http.get<ResponseDataModel>(API_URL + '/search/' + type, {
            params: {
                api_key: API_KEY,
                query,
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

    public getTopRated(mediaType: string, page = 1): Observable<ResponseDataModel> {
        return this.http.get<ResponseDataModel>(`${API_URL}/${mediaType}/top_rated`, {
            params: {
                api_key: API_KEY,
                page
            },  
        });
    }

    public getMoviesByGenre(genreId: number): Observable<ResponseDataModel> {
        return this.http.get<ResponseDataModel>(`${API_URL}/genre/${genreId}/movies`, {
            params: {
                api_key: API_KEY
            },
        });
    }

    public getShowsByGenre(genreId: number): Observable<ResponseDataModel> {
        return this.http.get<ResponseDataModel>(`${API_URL}/discover/tv`, {
            params: {
                api_key: API_KEY,
                with_genres: genreId,
                sort_by: 'popularity.desc',
                page: 1
            },
        });
    }

}
