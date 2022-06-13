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


  constructor(private commandService: CommandService) {

  }

  p: any;
  
  getMyCommand() {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.commandService.getMyCommand(consumer).subscribe(
      data => {
        console.log(data);
        this.dataPurchase = data.filter((command:any) => {
          return command.status === 'Valider' ;
        });
      }
    );
    return this.dataPurchase;
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
