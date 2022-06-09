import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @Input() productOutput: Boolean = true;
  @Input() offerOutput: Boolean = false;
  @Input() demandOutput: Boolean = false;
  @Input() demandOutputAdmin: Boolean = false;

  showFiller = true;
  dataPurchase: any = [];
  dataCommand: any = [];
  consumer !: Consumer;

  constructor(private routerService: ActivatedRoute, private productService: ProductService, private commandService: CommandService) { }

  nextPage() {
    console.log("nextPage");
  }

  p: any;
  data: any = [];
  getData() {
    this.productService.findAllPoduct().subscribe(
      (data) => {
        this.data = data;
      }
    );
  }

  getMyCommand() {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    console.log(this.data);
    this.commandService.getMyCommand(consumer).subscribe(
      data => {
        this.dataPurchase = data;
        console.log(data);
      }
    );
    console.log(this.commandService.getMyCommand(consumer));
  }

  getAllCommands(){
    this.commandService.getAllCommands().subscribe(
      data => {
        this.dataCommand = data;
        console.log(data);
      }
    )
  }

  ngOnInit(): void {
    this.getData();
    this.getMyCommand();
    this.getAllCommands();
    console.log(this.dataCommand);
    this.consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.usernameOutput = this.routerService.snapshot.params['username'];
  }

}
