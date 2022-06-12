import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandService } from 'src/app/command.service';
import { Consumer } from 'src/app/model/Consumer';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.css']
})
export class ContentBodyComponent implements OnInit {

  showFiller = true;
  dataPurchase: any = [];
  dataCommand: any = [];
  consumer !: Consumer;
  @Input() usernameOutput: string = '';
  @Input() typeOfOutput: string = '';

  items = new Map([
    ['itemOfGetAllProduct', false],
    ['itemOfDemands', false],
    ['itemOfMyDemand', false],
    ['itemOfAdminPurchaseDemand', false]
  ]
  );

  constructor(private routerService: ActivatedRoute, private productService: ProductService, private commandService: CommandService) { }

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
    this.commandService.getMyCommand(consumer).subscribe(
      data => {
        this.dataPurchase = data;
        // console.log(data);
      }
    );
    //console.log(this.commandService.getMyCommand(consumer));
  }

  getAllCommands() {
    this.commandService.getAllCommands().subscribe(
      data => {
        this.dataCommand = data;
        //console.log(data);
      }
    )
  }


  ngOnInit(): void {
    this.getData();
    this.getMyCommand();
    this.getAllCommands();
    //console.log(this.dataCommand);
    this.consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.usernameOutput = this.routerService.snapshot.params['username'];
  }

  ngOnChanges(event: any) {
    console.log(event.typeOfOutput.currentValue);
    for (let item of this.items.keys()) {
      this.items.set(item, false);
      if (event.typeOfOutput.currentValue == item) {
        this.items.set(item, true);
      }
    }
  }

}
