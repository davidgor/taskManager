import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  hide = true;
  loaded: Boolean = false;
  msg: String = '';

  httpObs: Observable<any>;
  processes: Array<{id: Number, state: Boolean, targetState: Boolean,
                name: String, cmd: String, dir: String}> = [];

  @Input() user: {user: String, id: Number};

  constructor(private http: HttpClient) { }

  ngOnInit() {

    const options = new HttpHeaders('withCredentials: true');
    this.httpObs = this.http.post(
    'http://localhost:80/getProcesses.php',
    JSON.stringify(this.user),
    {headers: options.set('Content-Type', 'application/json')}
    );

  }

  open() {
    // switch hide state
    this.hide = !this.hide;

    if (!this.loaded) {
      this.msg = 'Loading data...';
      this.httpObs.subscribe(
        (data: JSON) => {
          this.msg = '';
          let id = 0;
          while (data['id' + id] !== undefined) {

            let state: Boolean = false;
            let targetState: Boolean = false;

            if (data['run' + id] === '1') {
              state = true;
            }
            if (data['state' + id] === '1') {
              targetState = true;
            }

            this.processes.push(
              {id: data['id' + id], state: state, targetState: targetState,
               name: data['name' + id], cmd: data['cmd' + id], dir: data['dir' + id]}
            );
            id++;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.msg = 'Error loading data';
        }
      );

      this.loaded = true;
    }
  }
}
