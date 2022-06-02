import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }

  getData() {
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos');
   }
}
