import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getInfo(input: string): Observable<string[]> {
    const url = `/api/complete/search?client=firefox&q=${input}`;
    return this.http.get<string[]>(url);
  }
}
