import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Holiday } from 'src/app/model/Holiday';
import { EditHolidayService } from 'src/app/edit-holiday.service';

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
  selected = 'option2';

  constructor(private holidayService: EditHolidayService, private _formBuilder: FormBuilder) { }

  findHoliday() {
    this.holidayService.findAllHoliday().subscribe(
      data => {
        this.holidayData = data;
      }
    )
  }

  addHoliday(days: string, description: string) {
    const holiday = {} as Holiday;
    holiday.numberDay = +days;
    holiday.description = description;
    holiday.consumerDemand = JSON.parse(localStorage.getItem("consumer") || "");
    this.holidayService.addHoliday(holiday).subscribe();
    this.findHoliday();
  }

  ngOnInit(): void {
    this.findHoliday();
  }

  updateStatus(holiday: Holiday, status: string) {
    holiday.status = status;
    holiday.consumerAdmin = holiday.consumerDemand = JSON.parse(localStorage.getItem("consumer") || "");
    this.holidayService.updateHoliday(holiday).subscribe();
  }

  ngOnChanges(event: any) {
  }

}
