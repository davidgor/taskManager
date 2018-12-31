import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit {


  @Input() process: {id: Number, state: Boolean, targetState: Boolean,
                     name: String, cmd: String, dir: String, user: Number};
  @Output() processesRemoved = new EventEmitter();
  state: String = 'STOP';
  stateColor: String = 'red';
  targetRun: String = 'START';

  httpObs: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.process.state) {
      this.state = 'RUN';
      this.stateColor = 'green';
    }
    if (this.process.targetState) {
      this.targetRun = 'STOP';
    }
  }

  update() {
    // setup telegram
    const options = new HttpHeaders('withCredentials: true');
    this.httpObs = this.http.post(
    'http://localhost:80/changeTask.php',
    JSON.stringify(this.process),
    {headers: options.set('Content-Type', 'application/json')}
    );

    this.httpObs.subscribe(
      (data: JSON) => {
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

  }

  remove() {
    
  }

}
