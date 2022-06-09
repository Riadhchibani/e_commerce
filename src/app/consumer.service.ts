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
  optionsRegister = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public findAllClients(): Observable<Consumer[]> {
    return this.http.get<Consumer[]>(`${this.apiUrl}/getConsumers`);
  }

  public login(username: string, password: string): Observable<Consumer> {

    let _return = this.http.post<Consumer>(`${this.apiUrl}/getConsumer`, { "username": username, "password": password }, this.optionsRegister);
    return _return;

  }
}
