import {Component, Input, OnInit} from '@angular/core';
import {Command} from "../../model/Command";
import {Consumer} from "../../model/Consumer";
import {CommandService} from "../../command.service";

@Component({
  selector: 'app-validate-command',
  templateUrl: './validate-command.component.html',
  styleUrls: ['./validate-command.component.css']
})
export class ValidateCommandComponent implements OnInit {

  @Input() data!: Command;
  consumer !: Consumer;
  step = 0;
  dataPurchase: any = [];

  constructor(private commandService: CommandService) {

  }

  getMyCommand() {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.commandService.getMyCommand(consumer).subscribe(
      data => {
        console.log(data);
        this.dataPurchase = data.filter((command:any) => {
          return command.status === 'En attente' ;
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
