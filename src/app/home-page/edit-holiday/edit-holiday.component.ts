import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Holiday } from 'src/app/model/Holiday';
import { EditHolidayService } from 'src/app/edit-holiday.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Consumer} from "../../model/Consumer";

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-holiday',
  templateUrl: './edit-holiday.component.html',
  styleUrls: ['./edit-holiday.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class EditHolidayComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  status: Status[] = [
    { value: 'En cours', viewValue: 'En cours' },
    { value: 'Confirmée', viewValue: 'Confirmée' },
    { value: 'Refusée', viewValue: 'Refusée' },
  ];

  holidayData: Holiday[] = [];
  holidayDataConfirmed: Holiday[] = [];
  selected = 'option2';
  selectedBeginDate = new Date();
  selectedEndDate = new Date();
  displayedColumnsUpdate: string[] = ['nom', 'status', 'description', 'annuler'];
  displayedColumns: string[] = ['nom', 'status', 'description'];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  consumer !: Consumer;

  constructor(private _snackBar: MatSnackBar, private holidayService: EditHolidayService, private _formBuilder: FormBuilder) { }

  findHoliday() {
    this.holidayService.findAllHoliday().subscribe(
      data => {
        this.holidayData = data.filter((holiday: any) => {
          if(this.consumer.role == 'admin')
            return holiday.status != 'Confirmée';
          else
            return holiday.consumerDemand.id == this.consumer.id;
        });
        this.holidayDataConfirmed = data.filter((holiday: any) => {
          return holiday.status === 'Confirmée';
        });
      }
    )
  }

  async addHoliday(description: string) {
    const holiday = {} as Holiday;
    holiday.description = description;
    holiday.consumerDemand = JSON.parse(localStorage.getItem("consumer") || "");
    if (this.selectedBeginDate >= this.selectedEndDate) {
      this._snackBar.open("Date de début ou de fin de congés undefined", '', {
        duration: 1000
      });
    } else {
      holiday.beginDate = this.selectedBeginDate;
      holiday.endDate = this.selectedEndDate;
      await this.holidayService.addHoliday(holiday).toPromise();
      this.holidayData = [] ;
      this.holidayDataConfirmed = [] ;
      this.findHoliday();
    }
  }

  ngOnInit(): void {
    this.findHoliday();
    this.consumer = JSON.parse(localStorage.getItem("consumer") || "");
  }

  async updateStatus(holiday: Holiday, status: string) {
    holiday.status = status;
    holiday.consumerAdmin = holiday.consumerDemand = JSON.parse(localStorage.getItem("consumer") || "");
    await this.holidayService.updateHoliday(holiday).toPromise();
    this.holidayData = [];
    this.findHoliday();
  }

  async updateStatusByNotConfirmed(holiday: Holiday) {
    holiday.status = "En cours";
    holiday.consumerAdmin = holiday.consumerDemand = JSON.parse(localStorage.getItem("consumer") || "");
    await this.holidayService.updateHoliday(holiday).toPromise();
    this.holidayDataConfirmed = [];
    this.findHoliday();
  }

  ngOnChanges(event: any) {
    this.findHoliday();
  }

}
