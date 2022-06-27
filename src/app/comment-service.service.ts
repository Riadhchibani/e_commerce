import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private apiUrl: string;
  optionsRegister = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public addComment(comment: Comment) {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    const body = JSON.stringify(comment);
    return this.http.post(`${this.apiUrl}/saveComment`, body, this.optionsRegister);
  }
}
