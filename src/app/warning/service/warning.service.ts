import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WarningService {

  public mesages: Array<{mesage: String, type: String}> = [];
  public conectionLost = false;

  constructor() { }

  removeMsg(id: number) {
    this.mesages.splice(id, 1);
  }

  addMsg(msg: String, type: String) {
    if (this.mesages.length >= 3) {
      this.mesages.splice(0, 1);
    }

    this.mesages.push({mesage: msg, type: type});
    console.log('oki');
  }

  clearMsg() {
    this.mesages = [];
  }
}
