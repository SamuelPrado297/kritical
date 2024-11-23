// src/app/services/game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiKey = environment.rawgApiKey;
  private apiUrl = environment.rawgApiUrl;

  constructor(private http: HttpClient) { }

  // Método para buscar jogos populares
  getTopRatedGames(page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('ordering', '-rating')
      .set('page', page.toString());

    return this.http.get<any>(`${this.apiUrl}/games`, { params });
  }

  // Método para buscar jogos por nome
  searchGames(query: string, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('search', query)
      .set('page', page.toString());

    return this.http.get<any>(`${this.apiUrl}/games`, { params });
  }

  // Método para buscar jogos por gênero
  filterGamesByGenre(genre: string, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('genres', genre)
      .set('page', page.toString());

    return this.http.get<any>(`${this.apiUrl}/games`, { params });
  }

  // Método para obter detalhes de um jogo específico
  getGameDetails(gameId: number): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey);

    return this.http.get<any>(`${this.apiUrl}/games/${gameId}`, { params });
  }
}