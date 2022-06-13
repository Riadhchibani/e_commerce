import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Command } from './model/Command';
import { Consumer } from './model/Consumer';
import { Product } from './model/Product';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private apiUrl: string;
  command!: Command;
  optionsRegister = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public addCommand(consumer: Consumer, product: Product[], qte: number) {
    const command = {} as Command;
    command.products = product;
    command.consumer = consumer;
    command.qte = qte;
    const body = JSON.stringify(command);
    return this.http.post(`${this.apiUrl}/addCommand`, body, this.optionsRegister);
  }

  public validateCommand(command: Command) {
    const body = JSON.stringify(command);
    return this.http.post(`${this.apiUrl}/updateCommand`, body, this.optionsRegister);
  }

  public getMyCommand(consumer: Consumer): Observable<Command[]> {
    const body = JSON.stringify(consumer);
    return this.http.post<Command[]>(`${this.apiUrl}/getCommand`, body, this.optionsRegister);
  }

  public getAllCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.apiUrl}/getAllCommands`, this.optionsRegister);
  }

  public deleteCommand(command: Command) {
    console.log(command);
    const body = JSON.stringify(command);
    return this.http.post(`${this.apiUrl}/deleteCommand`, body, this.optionsRegister)
  }

}
