import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommandService } from 'src/app/command.service';
import { Consumer } from 'src/app/model/Consumer';
import { Product } from 'src/app/model/Product';
import { DialogAnimationsComponent } from './dialog-animations/dialog-animations.component';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {

  @Input() data!: Product;
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

  constructor(private commandService: CommandService, public dialog: MatDialog) { }

  addCommand(pro: Product) {
    this.consumer = JSON.parse(localStorage.getItem("consumer") || "");
    let pros: Product[];
    pros = [pro];
    this.commandService.addCommand(this.consumer, pros).subscribe(
      (dataa: any) => {
        //console.log(dataa);
      }
    );
  }

  ngOnInit(): void { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsComponent);
  }

}
