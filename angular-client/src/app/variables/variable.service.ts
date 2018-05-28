import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class VariableService {
  private apiUrl = 'http://localhost:3001/variables/';
  showAddVariableBox:boolean = true;

  constructor(private http: Http){ }

  getVariables(): Promise<any>{
      return this.http.get(this.apiUrl)
                 .toPromise()
                 .then(this.handleData)
                 .catch(this.handleError)
  }

  getVariable(id:string): Promise<any>{
    return this.http.get(this.apiUrl + id)
                    .toPromise()
                    .then(this.handleData)
                    .catch(this.handleError)
  }

  createVariable(variable:any): Promise<any>{
    console.log(variable);
    return this.http.post(this.apiUrl, variable)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleError)
  }

  updateVariable(variable:any):Promise<any>{
    return this.http
               .put(this.apiUrl, variable)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleData);
  }

  deleteVariable(variable:any):Promise<any>{
    return this.http
               .delete(this.apiUrl + variable._id)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleError);
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
