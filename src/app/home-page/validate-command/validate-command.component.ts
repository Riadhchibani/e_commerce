import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Command } from "../../model/Command";
import { Consumer } from "../../model/Consumer";
import { CommandService } from "../../command.service";
import { Product } from "../../model/Product";
import { MatPaginator } from '@angular/material/paginator';
import { CommentServiceService } from 'src/app/comment-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { Comment } from 'src/app/model/Comment';

@Component({
  selector: 'app-validate-command',
  templateUrl: './validate-command.component.html',
  styleUrls: ['./validate-command.component.css']
})
export class ValidateCommandComponent implements OnInit {

  @Input() data!: Command;
  p: any;
  consumer !: Consumer;
  step = 0;
  dataPurchase: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['reference', 'nom', 'prenom', 'produit', 'dateCreation', 'action'];

  constructor(public dialog: MatDialog, private commandService: CommandService, private commentServiceService: CommentServiceService) {

  }

  async validateCommand(command: Command) {
    command.status = 'Valider';
    await this.commandService.validateCommand(command).toPromise();
    this.getMyCommand();
  }

  getMyCommand() {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.commandService.getAllCommands().subscribe(
      data => {
        this.dataPurchase = data.filter((command: any) => {
          return command.status === 'En attente';
        });
      }
    );
    return this.dataPurchase;
  }

  async cancelCommand(command: Command) {
    command.status = 'Annuler' ;
    const commentDialog = await this.dialog.open(AddCommentComponent,{data: command});
    //resultDialog.componentInstance.name = 'Sunil';
    commentDialog.afterClosed().subscribe(res => {
      this.dataPurchase = [] ;
      this.getMyCommand();
    })
  }

  openDialog(command: Command) {
    this.commentServiceService.getCommandComment(command).subscribe(
      data => {
        let messageVal = data == "" ? null : data ;
        if (messageVal === null) {
          this.dialog.open(AddCommentComponent, {
            data: { commandVal: command }
          });
        } else {
          this.dialog.open(PopupMessage, {
            width: '500px',
            data: { message: messageVal }
          });
        }
      }
    )

  }

  annulerValidateCommand(comment: Comment) {
    this.commentServiceService.addComment(comment).subscribe();
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