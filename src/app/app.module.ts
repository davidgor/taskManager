import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { UsersComponent } from './users/users.component';
import { ProcessesComponent } from './processes/processes.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { WarningComponent } from './warning/warning.component';
import { ContorolComponent } from './contorol/contorol.component';
import { WarningService } from './warning/service/warning.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'manage', component: ManagerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerComponent,
    UsersComponent,
    ProcessesComponent,
    StatusComponent,
    WarningComponent,
    ContorolComponent
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WarningService],
  bootstrap: [AppComponent]
})
export class AppModule { }
