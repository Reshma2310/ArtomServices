import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpService) { }

  addData(data: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.postservice('http://localhost:60593/Service1.svc/insert/', data, true, header)
  }
}
