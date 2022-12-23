import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iprogram } from '../moduls/main';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  category: string = ''


  postData(url: string): Observable<Iprogram[]> {
    return this.http.post<Iprogram[]>(url, { Option: { Headers: { 'Access-Control-Allow-Origin': '*' } } })
  }
}
