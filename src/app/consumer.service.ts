import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consumer } from './model/Consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private apiUrl: string;

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public findAllClients(): Observable<Consumer[]> {
    return this.http.get<Consumer[]>(`${this.apiUrl}/getConsumers`);
  }

  public login(username: string, password: string): Observable<Consumer> {
    let params = new HttpParams();
    params.set("username", username);
    params.set("password", password);
    return this.http.get<Consumer>(`${this.apiUrl}/getConsumer`, { params });
  }
}
