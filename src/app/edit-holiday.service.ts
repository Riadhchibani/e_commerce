import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Holiday } from './model/Holiday';

@Injectable({
  providedIn: 'root'
})
export class EditHolidayService {

  private apiUrl: string;
  optionsRegister = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private routerService: ActivatedRoute) {
    this.apiUrl = environment.apibaseUrl;
  }

  public addHoliday(holiday: Holiday) {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    holiday.consumerDemand = consumer;
    const body = JSON.stringify(holiday);
    console.log(body);
    return this.http.post(`${this.apiUrl}/saveHoliday`, body, this.optionsRegister);
  }

  public findAllHoliday() {
    return this.http.get<Holiday[]>(`${this.apiUrl}/findAllHoliday`);
  }

  public updateHoliday(holiday: Holiday): Observable<Holiday> {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });
    const body = JSON.stringify(holiday);
    return this.http.put<Holiday>(`${this.apiUrl}/updateHolidayStatus`, body, { headers });
  }
}
