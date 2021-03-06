import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { WarningService } from '../warning/service/warning.service';
import { UserService } from '../userService/user.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {


  httpObs: Observable<any>;
  users: Array<{user: String, id: Number}> = [];


  constructor(
    private userS: UserService,
    private warningService: WarningService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    if (!this.userS.isLoggedIn()) {
      this.router.navigate([`login`]);
    }

    const options = new HttpHeaders('withCredentials: true');
    this.httpObs = this.http.get('http://localhost:80/getUser.php', {headers: options});

    this.httpObs.subscribe(
      (data: JSON) => {
        let id = 0;
        while (data['id' + id] !== undefined) {
          this.users.push(
            {user: data['user' + id], id: data['id' + id]}
          );
          id++;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.warningService.addMsg('Your not logged in', 'danger');
        this.router.navigate([`login`]);
      }
    );

    return false;
  }

}
