import { Component, OnInit } from '@angular/core';
import { WarningService } from './service/warning.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
  providers: [ WarningService ]
})
export class WarningComponent implements OnInit {

  mesages: Array<String> = [];

  constructor(private warningService: WarningService ) { }

  ngOnInit() {
  }

}
