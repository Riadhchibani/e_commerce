import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Outlay } from './model/Outlay';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private apiUrl: string;
  optionsRegister = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public addFacture(outlay: Outlay) {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    outlay.consumer = consumer;
    const body = JSON.stringify(outlay);
    return this.http.post(`${this.apiUrl}/addOutlay`, body, this.optionsRegister);
  }
}
