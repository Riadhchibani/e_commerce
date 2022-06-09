import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  optionsRegister = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public findAllPoduct(): Observable<Product[]> {
    const headers = new HttpHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/findProducts`, this.optionsRegister);
  }

  public addProduct(product: Product): Observable<Product[]> {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });
    const body = JSON.stringify(product);
    return this.http.post<Product[]>(`${this.apiUrl}/addProduct`, body, { headers });
  }

  public findProductByShortLabel(shortLabel: string): Observable<Product[]> {
    let params = new HttpParams().set("shortLabel", shortLabel);
    return this.http.post<Product[]>(`${this.apiUrl}/findProductByLabel`, { params });
  }


}
