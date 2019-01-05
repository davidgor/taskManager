import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { WarningService } from '../warning/service/warning.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: []
})
export class UsersComponent implements OnInit {

  hide = true;
  adding = false;
  loaded: Boolean = false;
  msg: String = '';

  loadHttp: Observable<any>;
  addHttp: Observable<any>;
  relHttp: Observable<any>;

  processes: Array<{id: String, state: Boolean, targetState: Boolean,
                name: String, cmd: String, dir: String, user: Number}> = [];


  @Input() user: {user: String, id: Number};


  processPrototype: {id: Number, state: Boolean, targetState: Boolean,
                    name: String, cmd: String, dir: String, user: Number}
  = {id: 0, state: false, targetState: false,
     name: '', cmd: '', dir: '', user: 1};

  constructor(private http: HttpClient, private warningService: WarningService ) { }

  ngOnInit() {

    const options = new HttpHeaders('withCredentials: true');
    this.loadHttp = this.http.post(
    'http://localhost:80/getProcesses.php',
    JSON.stringify(this.user),
    {headers: options.set('Content-Type', 'application/json')}
    );
    this.relHttp = this.http.post(
    'http://localhost:80/getRunning.php',
    JSON.stringify(this.user),
    {headers: options.set('Content-Type', 'application/json')}
    );

    interval(2500).subscribe(x =>  this.refreshStatus());

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
        () => {
          this.warningService.addMsg('Item added', 'success');
          this.adding = false;
          this.processPrototype.name = '';
          this.processPrototype.cmd  = '';
          this.processPrototype.dir  = '';
          this.reloadData();
        },
        (err: HttpErrorResponse) => {
          this.warningService.addMsg('faild adding item: ' + err.message , 'danger');
          this.adding = false;
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
        this.loaded = false;
        this.warningService.addMsg('Error loading processes: ' + err.message, 'danger');
      }
    );
  }

  refreshStatus() {
    if (!this.hide) {
      this.relHttp.subscribe(
        (data: JSON) => {
          this.warningService.conectionLost = false;

          this.msg = '';
          let id = 0;
          while (data['id' + id] !== undefined) {

            // check if process is running or not
            let state: Boolean = false;
            if (data['run' + id] === '1') {
              state = true;
            }

            // find the process with the id
            this.processes.forEach(function(process) {
              if (process.id  ===  data['id' + id]) {
                process.state = state;
              }
            });
            id++;
          }
        },
        (err: HttpErrorResponse) => {
          this.warningService.conectionLost = true;
          console.log(err);
        }
      );
    }
  }
}
