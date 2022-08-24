import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'src/app/model/Command';
import { Consumer } from 'src/app/model/Consumer';
import {CommandService} from "../../command.service";

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css']
})
export class DemandComponent implements OnInit {

  @Input() data!: Command;
  consumer !: Consumer;
  step = 0;
  dataPurchase: any = [];
  dataPurchaseSaved: any = [];
  display = "none";

  selectedStatus !:string ;
  displayedColumns: string[] = ['reference', 'nom', 'prenom', 'produit', 'dateCreation' , 'status', 'raison'];

  constructor(private commandService: CommandService) {

  }

  p: any;
  
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  getMyCommand() {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.commandService.getMyCommand(consumer).subscribe(
      data => {
        this.dataPurchase = data ;
        this.dataPurchaseSaved = data;
       // this.dataPurchase = data.filter((command:any) => {
        //  return command.status === 'Valider' ;
        //});
      }
    );
    return this.dataPurchase;
  }

  async changeStatus() {
    this.dataPurchase = this.dataPurchaseSaved ;
    if(this.selectedStatus)
    this.dataPurchase = this.dataPurchase.filter((e:any) => {
      return e.status === this.selectedStatus;
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {
    this.consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.getMyCommand();
  }

}
