import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FactureService } from 'src/app/facture.service';
import { Outlay } from 'src/app/model/Outlay';

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {

  constructor(private factureService:FactureService) { }

  disableSelect = new FormControl(false);

  addFacture(type: string, price:string, description:string){
    const outlay = {} as Outlay;
    outlay.type = type;
    outlay.price = +price;
    outlay.description = description;
    this.factureService.addFacture(outlay).subscribe();
  }

  ngOnInit(): void {
  }

}
