import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: {userName: String, passwd: String} =
    {userName: '', passwd: ''};
  error = false;

  httpObs: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.httpObs = this.http.post(
    'api.datwuffy.com/login.php',
    JSON.stringify(this.loginData),
    {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    );


  }

  login() {
    this.httpObs.subscribe(
      (data) => {

      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.error = true;
      }
    );
    return false;
  }

}
