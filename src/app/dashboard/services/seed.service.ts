import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging
import { Log } from '../models/log.model';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class SeedService {


  url = 'http://loggingweb2.azurewebsites.net/api/LogMessages';
  // assets/seed.json
  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) { }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {Log[]} The Observable for the HTTP request.
   */
  get(): Observable<Log[]> {
    return this.http.get(`${this.url}`)
      .map((res: Response) => res.json())
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  dismiss(logMessage: Log): Observable<Log> {
    return this.http.put(`${this.url}/${logMessage.id}`, logMessage)
      .map((res: Response) => res.json())
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  createNew(logMessage: Log): Observable<Response> {
    return this.http.post(`${this.url}`, logMessage)
      .map(res => res ? res.json() : {})
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
    * Handle HTTP error
    */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
