import { Component, Input, OnInit } from '@angular/core';
import { CommandService } from 'src/app/command.service';
import { Consumer } from 'src/app/model/Consumer';
import { Product } from 'src/app/model/Product';
import {Command} from "../../model/Command";

@Component({
  selector: 'app-purchase-demand',
  templateUrl: './purchase-demand.component.html',
  styleUrls: ['./purchase-demand.component.css']
})
export class PurchaseDemandComponent implements OnInit {

  @Input() data!: any;
  p: any;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;
  consumer!: Consumer;
  dataPurchase: any = [];



  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  constructor(private commandService: CommandService) {

  }

  getMyCommand() {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.commandService.getMyCommand(consumer).subscribe(
      data => {
        this.dataPurchase = data.filter((command:any) => {
          return command.status === 'En attente' ;
        });
      }
    );
    //console.log(this.commandService.getMyCommand(consumer));
  }


 async deleteCommand(command:Command)  {
    console.log('rrrr');
    await this.commandService.deleteCommand(command).toPromise();
    this.getMyCommand();
  }


  ngOnInit(): void {
    //console.log(this.data);
    this.getMyCommand();
  }

}
