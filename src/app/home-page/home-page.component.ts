import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommandService } from '../command.service';
import { Command } from '../model/Command';
import { Consumer } from '../model/Consumer';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  @Input() usernameOutput: string = '';
  @Output() newItemEvent = new EventEmitter<string>();
  public itemTemp: string = 'itemOfGetAllProduct';
  itemOfGetAllProduct: string = "itemOfGetAllProduct";
  itemOfDemands: string = "itemOfDemands";
  itemOfMyDemand: string = "itemOfMyDemand";
  itemOfAdminPurchaseDemand: string = "itemOfAdminPurchaseDemand";
  consumer !: Consumer;

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    console.log(value);
    this.itemTemp = value;
  }



  constructor(private routerService: ActivatedRoute,private router : Router) { }


  btnClick (path:string) {
     this.router.navigateByUrl('home/'+this.usernameOutput+'/'+path);
  }

  ngOnInit(): void {
    this.consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.usernameOutput = this.routerService.snapshot.params['username'];
  }

}
