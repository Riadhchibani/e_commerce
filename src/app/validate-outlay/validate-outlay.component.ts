import { Component, OnInit } from '@angular/core';
import { FactureService } from '../facture.service';
import { Consumer } from '../model/Consumer';
import { Outlay } from '../model/Outlay';

@Component({
  selector: 'app-validate-outlay',
  templateUrl: './validate-outlay.component.html',
  styleUrls: ['./validate-outlay.component.css']
})
export class ValidateOutlayComponent implements OnInit {

  constructor(private factureService: FactureService) { }

  dataOutlays!: Outlay[];
  consumer !: Consumer;
  displayedColumns: string[] = ['type', 'prix', 'description'];

  findOutlay() {
    this.factureService.findOutlay().subscribe(
      data => {
        this.dataOutlays = data;
      }
    )
  }


  validateOutlay(element: any) {
    console.log(element);
  }

  async findAllOutlay(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.factureService.findOutlay().subscribe({
        next: data => {
          this.dataOutlays = data;
          resolve;
        },
        error: err => {
          reject(err);
        }
      });
    });
  }


  ngOnInit(): void {
    this.findOutlay()
  }

}
