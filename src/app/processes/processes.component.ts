import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit {


  @Input() process: {id: Number, state: Boolean, targetState: Boolean,
                     name: String, cmd: String};

  state: String = 'STOP';
  stateColor: String = 'red';
  targetRun: String = 'START';

  constructor() { }

  ngOnInit() {
    if (this.process.state) {
      this.state = 'RUN';
      this.stateColor = 'GREEN';
    }
    if (this.process.targetState) {
      this.targetRun = 'STOP';
    }
  }

  update() {
    
  }

}
