import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ExecuteService {
  private apiUrl = 'http://localhost:3001/mlapi/';

  constructor(private http: Http){ }

  testClassifierAccuracy(): Promise<any>{
    return this.http.get(this.apiUrl + 'accuracy')
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  predictWithClassifier(urlParams): Promise<any>{
    return this.http.get(this.apiUrl + 'predict',{ params: urlParams })
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  getCSVFile(): Observable<any> {
    return this.http.get('assets/num_car_evaluation.csv');
  }

  private handleData(res: any) {
    let body = res.json();
    console.log(body); // for development purposes only
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for development purposes only
    return Promise.reject(error.message || error);
  }

}
