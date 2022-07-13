import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Command } from './model/Command';
import { Comment } from './model/Comment';
import { Holiday } from './model/Holiday';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private apiUrl: string;
  optionsRegister = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public addComment(comment: Comment) {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    const body = JSON.stringify(comment);
    console.log(body);
    return this.http.post(`${this.apiUrl}/saveComment`, body, this.optionsRegister);
  }

  public getHolidayComment(holiday: Holiday):Observable<string>{
    const body = JSON.stringify(holiday);
    return this.http.post<string>(`${this.apiUrl}/getHolidayComment`, body, this.optionsRegister);
  }

  public getCommandComment(command: Command):Observable<string>{
    const body = JSON.stringify(command);
    return this.http.post<string>(`${this.apiUrl}/getCommandComment`, body, this.optionsRegister);
  }
}
