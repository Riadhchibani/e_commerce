import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Holiday } from 'src/app/model/Holiday';
import { EditHolidayService } from 'src/app/edit-holiday.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Consumer } from "../../model/Consumer";
import { AddCommentComponent } from '../validate-command/add-comment/add-comment.component';
import { Comment } from 'src/app/model/Comment';
import { CommentServiceService } from 'src/app/comment-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  commentItem: string = "";
  holidayDataConfirmed: Holiday[] = [];
  selected = 'option2';
  selectedBeginDate = new Date();
  selectedEndDate = new Date();
  displayedColumnsUpdate: string[] = ['nom', 'status', 'description', 'action'];
  displayedColumns: string[] = ['nom', 'status', 'description', 'commentaire'];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  consumer !: Consumer;

  constructor(private _snackBar: MatSnackBar, private holidayService: EditHolidayService, private _formBuilder: FormBuilder, private commentServiceService: CommentServiceService, public dialog: MatDialog) { }

  findHoliday() {
    this.holidayService.findAllHoliday().subscribe(
      data => {
        this.holidayData = data.filter((holiday: any) => {
          if (this.consumer.role == 'admin')
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
      this.holidayData = [];
      this.holidayDataConfirmed = [];
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

  openDialog(holiday: Holiday) {
    let resultDialog = this.dialog.open(AddCommentComponent);
    resultDialog.afterClosed().subscribe(
      (result: string) => {
        let comment = {} as Comment;
        comment.description = result;
        holiday.status = "Refusée";
        comment.holiday = holiday;
        this.annulerHoliday(comment);
        this.updateStatusByNotConfirmed(holiday, comment);
      }
    )
  }

  annulerHoliday(comment: Comment) {
    this.commentServiceService.addComment(comment).toPromise();
  }

  async updateStatusByNotConfirmed(holiday: Holiday, comment: Comment) {
    //holiday.comment = comment;
    holiday.consumerAdmin = holiday.consumerDemand = JSON.parse(localStorage.getItem("consumer") || "");
    console.log("hol", holiday);
    await this.holidayService.updateHoliday(holiday).toPromise();
    this.holidayDataConfirmed = [];
    this.findHoliday();
  }

  getCommentHoliday(element: Holiday) {
    this.commentServiceService.getHolidayComment(element).subscribe(
      data => {
        this.dialog.open(PopupMessage, {
          width: '500px',
          data: { message: data }
        });
        // this._snackBar.open(data, 'annuler', {

        // });
      }
    )
  }

  openDialogComment(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PopupMessage);
  }
}
@Component({
  template: '<h4>{{data.message}}</h4>'
})
export class PopupMessage implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Dialog) {

  }
  ngOnInit(): void {
    console.log(this.data.message);
    throw new Error('Method not implemented.');
  }
}

interface Dialog {
  message: string;
}