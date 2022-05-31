import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CardProductComponent } from './home-page/card-product/card-product.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    CardProductComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    NgbModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatListModule,
    MatGridListModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'home/:role/:username', component: HomePageComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
