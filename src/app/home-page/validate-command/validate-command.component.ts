import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Command } from "../../model/Command";
import { Consumer } from "../../model/Consumer";
import { CommandService } from "../../command.service";
import { Product } from "../../model/Product";
import { MatPaginator } from '@angular/material/paginator';
import { CommentServiceService } from 'src/app/comment-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from './add-comment/add-comment.component';

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

  openDialog(): void {
    this.dialog.open(AddCommentComponent);
  }

  getMyCommand() {
    let consumer = JSON.parse(localStorage.getItem("consumer") || "");
    this.commandService.getAllCommands().subscribe(
      data => {
        console.log(data);
        this.dataPurchase = data.filter((command: any) => {
          return command.status === 'En attente';
        });
      }
    );
    return this.dataPurchase;
  }

  annulerValidateCommand() {
    //await this.commentServiceService.addComment
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
