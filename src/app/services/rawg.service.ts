// src/app/services/rawg.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private API_URL = 'https://api.rawg.io/api';
  private API_KEY = 'sua_chave_api'; // Substitua pela sua chave de API

  constructor(private http: HttpClient) {}

  // Método para pegar detalhes de um jogo específico (incluindo descrição)
  getGameDetails(gameId: number): Observable<any> {
    let params = new HttpParams().set('key', this.API_KEY);
    return this.http.get(`${this.API_URL}/games/${gameId}`, { params });
  }

  getGames(page: number = 1, pageSize: number = 20, search: string = '', genres: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('key', this.API_KEY)
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (genres) {
      params = params.set('genres', genres);
    }

    return this.http.get(`${this.API_URL}/games`, { params });
  }

  getGenres(): Observable<any> {
    let params = new HttpParams().set('key', this.API_KEY);
    return this.http.get(`${this.API_URL}/genres`, { params });
  }
}