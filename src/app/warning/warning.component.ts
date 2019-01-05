import { Component, OnInit } from '@angular/core';
import { WarningService } from './service/warning.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
  providers: []
})
export class WarningComponent implements OnInit {


  constructor(private warningService: WarningService ) { }

  ngOnInit() {
  }

}
