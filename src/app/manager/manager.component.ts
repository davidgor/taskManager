import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  httpObs: Observable<any>;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.httpObs = this.http.get('http://localhost:80/isLogged.php');

    this.httpObs.subscribe(
      (data: boolean) => {
        console.log(data);
        if (!data) {
          this.router.navigate([`login`]);
        }
      },
      (err: HttpErrorResponse) => {
        this.router.navigate([`login`]);
      }
    );

    return false;
  }

}
