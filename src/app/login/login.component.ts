import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WarningService } from '../warning/service/warning.service';
import { UserService } from '../userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: {userName: String, passwd: String} =
    {userName: '', passwd: ''};

  userName: String;

  httpObs: Observable<any>;

  constructor(private userS: UserService, private warningService: WarningService, private router: Router, private http: HttpClient) { }

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
        if (data !== 0) {
          this.warningService.addMsg('Logged in', 'success');
          this.router.navigate([`manage`]);
          this.userS.setUserID(data);
        } else {
          this.warningService.addMsg('Login data wrong', 'danger');
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.warningService.addMsg('Can not contact server: ' + err.message, 'danger');
      }
    );

    return false;
  }

}
