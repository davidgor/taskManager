import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WarningService } from '../warning/service/warning.service';

@Component({
  selector: 'app-contorol',
  templateUrl: './contorol.component.html',
  styleUrls: ['./contorol.component.css']
})
export class ContorolComponent implements OnInit {


  httpObs: Observable<any>;

  constructor(private warningService: WarningService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    const options = new HttpHeaders('withCredentials: true');
    this.httpObs = this.http.get('http://localhost:80/logout.php', {headers: options});
  }

  logout() {
    this.httpObs.subscribe(
      (data: JSON) => {
        this.router.navigate([`login`]);
        this.warningService.addMsg('Logged out successfully', 'success');
      },
      (err: HttpErrorResponse) => {
        this.warningService.addMsg('Error loggin out: ' + err.message, 'danger');
        console.log(err);
      }
    );
  }

}
