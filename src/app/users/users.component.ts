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
  adding = false;
  loaded: Boolean = false;
  msg: String = '';

  loadHttp: Observable<any>;
  addHttp: Observable<any>;
  processes: Array<{id: Number, state: Boolean, targetState: Boolean,
                name: String, cmd: String, dir: String, user: Number}> = [];


  @Input() user: {user: String, id: Number};


  processPrototype: {id: Number, state: Boolean, targetState: Boolean,
                    name: String, cmd: String, dir: String, user: Number}
  = {id: 0, state: false, targetState: false,
     name: '', cmd: '', dir: '', user: 1};

  constructor(private http: HttpClient) { }

  ngOnInit() {

    const options = new HttpHeaders('withCredentials: true');
    this.loadHttp = this.http.post(
    'http://localhost:80/getProcesses.php',
    JSON.stringify(this.user),
    {headers: options.set('Content-Type', 'application/json')}
    );

  }

  open() {
    // switch hide state
    this.hide = !this.hide;

    if (!this.loaded) {
      this.reloadData();
      this.loaded = true;
    }
  }

add() {
    this.processPrototype.user = this.user.id;
    const options = new HttpHeaders('withCredentials: true');
    this.addHttp = this.http.post(
    'http://localhost:80/addTask.php',
    JSON.stringify(this.processPrototype),
    {headers: options.set('Content-Type', 'application/json')}
    );

    this.adding = true;

    this.addHttp.subscribe(
        (data: JSON) => {
          this.adding = true;
          this.processPrototype.name = '';
          this.processPrototype.cmd  = '';
          this.processPrototype.dir  = '';
          this.reloadData();
        },
        (err: HttpErrorResponse) => {
          this.adding = true;
          console.log(err);
        }
      );
  }

  reloadData() {
    // clear list
    this.processes = [];

    this.msg = 'Loading data...\n';

    this.loadHttp.subscribe(
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
              name: data['name' + id], cmd: data['cmd' + id],
              dir: data['dir' + id], user: this.user.id}
          );
          id++;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.msg = 'Error loading data\n';
      }
    );
  }
}
