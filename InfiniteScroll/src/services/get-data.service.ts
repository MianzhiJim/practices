import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Data } from 'src/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getFirstFive(): Observable<Data> {
    return this.http.get<Data>('api/fe/testimonials?limit=5');
  }

  getMore(after: number): Observable<Data> {
    return this.http.get<Data>(`api/fe/testimonials?limit=5&after=${after}`);
  }
}
