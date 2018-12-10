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
  loginfailure = false;

  userName: String;

  httpObs: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    this.httpObs = this.http.post(
    'http://localhost:80/login.php',
    JSON.stringify(this.loginData),
    {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    );

    this.httpObs.subscribe(
      (data: boolean) => {
        console.log(data);
        if (data) {
          this.loginfailure = false;
          this.error = false;
        } else {
          this.loginfailure = true;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.error = true;
      }
    );

    return false;
  }

}
