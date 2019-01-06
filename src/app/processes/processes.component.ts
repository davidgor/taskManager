import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WarningService } from '../warning/service/warning.service';
import { UserService } from '../userService/user.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit {


  @Input() process: {id: number, state: Boolean, targetState: Boolean,
                     name: String, cmd: String, dir: String, user: number};
  @Output() removed = new EventEmitter();

  enabled: Boolean;

  state: String = 'STOP';
  stateColor: String = 'red';
  targetRun: String = 'START';

  httpUpdate: Observable<any>;
  httpsetState: Observable<any>;
  httpRemove: Observable<any>;

  constructor(
    private userS: UserService,
    private warningService: WarningService,
    private http: HttpClient) { }

  ngOnInit() {
    if (this.process.state) {
      this.state = 'RUN';
      this.stateColor = 'green';
    }
    if (this.process.targetState) {
      this.targetRun = 'STOP';
    }

    this.enabled = !this.userS.hasPremition(this.process.user);

    const options = new HttpHeaders('withCredentials: true');
    this.httpRemove = this.http.post(
    'http://localhost:80/remTask.php',
    JSON.stringify(this.process),
    {headers: options.set('Content-Type', 'application/json')}
    );
  }

  update() {
    // setup telegram
    const options = new HttpHeaders('withCredentials: true');
    this.httpUpdate = this.http.post(
    'http://localhost:80/changeTask.php',
    JSON.stringify(this.process),
    {headers: options.set('Content-Type', 'application/json')}
    );

    this.httpUpdate.subscribe(
      (data: JSON) => {
        this.warningService.addMsg('Item updated', 'success');
      },
      (err: HttpErrorResponse) => {
        this.warningService.addMsg('Error updating item: ' + err.message, 'danger');
        console.log(err);
      }
    );

  }

  remove() {
    if (confirm('Are you sure to delete this?')) {
      this.httpRemove.subscribe(
        (data: JSON) => {
          this.removed.emit(null);
          this.warningService.addMsg('Item removed', 'success');
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.warningService.addMsg('Error removing process: ' + err.message, 'danger');
        }
      );
    }
  }

  changeState() {
    this.process.targetState = !this.process.targetState;

    this.targetRun = 'START';
    if (this.process.targetState) {
      this.targetRun = 'STOP';
    }

    const options = new HttpHeaders('withCredentials: true');
    this.httpsetState = this.http.post(
    'http://localhost:80/setState.php',
    JSON.stringify(this.process),
    {headers: options.set('Content-Type', 'application/json')}
    );
    this.httpsetState.subscribe(
      (data: JSON) => {
        this.warningService.addMsg('status change pending', 'success');
      },
      (err: HttpErrorResponse) => {
        this.warningService.addMsg('Item change error: ' + err.message , 'danger');
        console.log(err);
      }
    );
  }

}
