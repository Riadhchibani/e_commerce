import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string;

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public findAllPoduct():Observable<Product[]>{
    const headers = new HttpHeaders();
    let value = this.http.get<Product[]>(`${this.apiUrl}/findProducts`, { headers });
    console.log(`${this.apiUrl}/findProducts`)
    console.log(headers)
    console.log(value);
    return value;
  }
}
