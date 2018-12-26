import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    const options = new HttpHeaders('withCredentials: true');
    this.httpObs = this.http.post(
    'http://localhost:80/login.php',
    JSON.stringify(this.loginData),
    {headers: options.set('Content-Type', 'application/json')}
    );

    this.httpObs.subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.loginfailure = false;
          this.error = false;
          this.router.navigate([`manage`]);
        } else {
          this.loginfailure = true;
          this.error = false;
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
