import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

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
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { DemandComponent } from './home-page/demand/demand.component';
import { MatSliderModule } from '@angular/material/slider';
import { PurchaseDemandComponent } from './home-page/purchase-demand/purchase-demand.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAnimationsComponent } from './home-page/card-product/dialog-animations/dialog-animations.component';
import { ContentBodyComponent } from './home-page/content-body/content-body.component';
import { ListCommandComponent } from './list-command/list-command.component';
import { ValidateCommandComponent } from './home-page/validate-command/validate-command.component';
import { AddProductComponent } from './home-page/add-product/add-product.component';
import { AddFactureComponent } from './home-page/add-facture/add-facture.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    CardProductComponent,
    DemandComponent,
    PurchaseDemandComponent,
    DialogAnimationsComponent,
    ContentBodyComponent,
    ListCommandComponent,
    ValidateCommandComponent,
    AddProductComponent,
    AddFactureComponent
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
    MatExpansionModule,
    ScrollingModule,
    NgxPaginationModule,
    HttpClientModule,
    MatSliderModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'home/:username', component: HomePageComponent, children: [
          { path: 'listProduct', component: CardProductComponent },
          { path: 'listCommand', component: PurchaseDemandComponent },
          { path: 'listMyDemand', component: DemandComponent },
          { path: 'validateCommand', component: ValidateCommandComponent },
          { path: 'listOrder', component: ListCommandComponent },
          { path: 'addProduct', component: AddProductComponent },
          { path: 'addFacture', component: AddFactureComponent }
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
