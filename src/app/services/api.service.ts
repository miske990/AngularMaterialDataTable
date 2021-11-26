import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/result';

  tableData(){
    return this.http.get(this.url)
      .pipe(
        map(res => {
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
  }
  
}


