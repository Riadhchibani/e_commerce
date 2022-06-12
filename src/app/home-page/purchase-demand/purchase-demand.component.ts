import { Component, Input, OnInit } from '@angular/core';
import { CommandService } from 'src/app/command.service';
import { Consumer } from 'src/app/model/Consumer';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-purchase-demand',
  templateUrl: './purchase-demand.component.html',
  styleUrls: ['./purchase-demand.component.css']
})
export class PurchaseDemandComponent implements OnInit {

  @Input() data!: any;
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
  
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
  
  constructor(private commandService: CommandService) { }


  ngOnInit(): void {
    //console.log(this.data);
  }

}
