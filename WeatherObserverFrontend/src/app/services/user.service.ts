import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ObservedCity } from '../models/observed-city';
import { User } from '../models/user';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = new Map<string, ObservedCity[]>();
  loggedUser: string = 'GoShare';
  private _isAuthenticated: boolean;

  REST_API: string = 'http://localhost:8080/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':  'application/json' })
  };
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  //     'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
  //   })
  // };
  constructor(
    private http: HttpClient,
    private weatherService: WeatherService
  ) {
    this._isAuthenticated = false;
  }

  authenticate() {
    this._isAuthenticated = true;
  }

  public get isAuthenticated(): boolean{
    return this._isAuthenticated;
  }

  logout() {
    this._isAuthenticated = false;
    this.loggedUser = '';
  }


  // Add Observed City
  AddObservedCity(userkey: string, observedcity: ObservedCity): Observable<any> {
    let API_URL = `${this.REST_API}/add-observedcity`;
    const data = { "userKey": userkey, "observedCity": observedcity };
    console.log(data);
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // getUser
  GetObservedCities(userKey: string): Observable<any> {
    let API_URL = `${this.REST_API}/${userKey}`;
    return this.http.get<ObservedCity[]>(API_URL)
      .pipe(
        catchError(this.handleError)
      );
  }

   // Get all objects
   GetUsers() {
    return this.http.get(`${this.REST_API}`);
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
    
}
