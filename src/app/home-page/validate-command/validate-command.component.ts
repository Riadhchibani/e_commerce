import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Command } from "../../model/Command";
import { Consumer } from "../../model/Consumer";
import { CommandService } from "../../command.service";
import { Product } from "../../model/Product";
import { MatPaginator } from '@angular/material/paginator';
import { CommentServiceService } from 'src/app/comment-service.service';
import { MatDialog } from '@angular/material/dialog';
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

  openDialog(command: Command) {
    let resultDialog = this.dialog.open(AddCommentComponent);
    resultDialog.afterClosed().subscribe(
      result => {
        let comment = {} as Comment;
        comment.description = result;
        comment.command = command;
        this.annulerValidateCommand(comment);
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
