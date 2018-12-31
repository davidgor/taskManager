import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit {


  @Input() process: {id: Number, state: Boolean, targetState: Boolean,
                     name: String, cmd: String, dir: String, user: Number};
  @Output() removed = new EventEmitter();

  state: String = 'STOP';
  stateColor: String = 'red';
  targetRun: String = 'START';

  httpUpdate: Observable<any>;
  httpRemove: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.process.state) {
      this.state = 'RUN';
      this.stateColor = 'green';
    }
    if (this.process.targetState) {
      this.targetRun = 'STOP';
    }

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
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

  }

  remove() {

    this.httpRemove.subscribe(
      (data: JSON) => {
        this.removed.emit(null);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

}
