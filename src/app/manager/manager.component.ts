import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {


  httpObs: Observable<any>;
  users: Array<{user: String, id: Number}> = [];
  test: Array<String> = ['test'];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    const options = new HttpHeaders('withCredentials: true');
    this.httpObs = this.http.get('http://localhost:80/getUser.php', {headers: options});

    this.httpObs.subscribe(
      (data: JSON) => {
        let id = 0;
        while (data['id' + id] !== undefined) {
          this.users.push(
            {user: data['user' + id], id: id['id' + id]}
          );
          id++;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.router.navigate([`login`]);
      }
    );

    return false;
  }

}
