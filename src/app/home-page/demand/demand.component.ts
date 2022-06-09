import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'src/app/model/Command';
import { Consumer } from 'src/app/model/Consumer';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css']
})
export class DemandComponent implements OnInit {

  @Input() data!: Command;
  consumer !: Consumer;
  constructor() { }
  step = 0;

  

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
  }

}
