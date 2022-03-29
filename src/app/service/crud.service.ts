import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Book } from './book';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  REST_API: string = 'http://localhost:8000/api';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient: HttpClient) { }


  AddBook(data: Book): Observable<any> {
    let API_URL= `${this.REST_API}/add-book`;
    console.log(API_URL);
    console.log("hello");
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))
  }


  getBooks() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  getBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/${id}`;
    console.log(API_URL)
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any) => {
      return res || {}
    }))
    catchError(this.handleError)
  }

  updateBook(id: any, data: any): Observable<any> {
  let API_URL = `${this.REST_API}/update-book/${id}`;
  return this.httpClient.put(API_URL,data,{headers: this.httpHeaders}).pipe(map((res:any)=>{
  }))
  }
  
  deleteBook(id:any):Observable<any>{
    let API_URL = `${(this.REST_API)}/delete-book/${id}`;
    console.log("ab" + API_URL);
    return  this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(catchError(this.handleError))

  }

  handleError(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof  ErrorEvent){
      errorMessage =error.error.message;
    }else{
      errorMessage = `Error Code:${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage)
    return throwError(errorMessage);
  }
  

}
