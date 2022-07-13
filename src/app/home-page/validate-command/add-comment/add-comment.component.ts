import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentServiceService } from 'src/app/comment-service.service';
import { Command } from 'src/app/model/Command';
import { Comment } from 'src/app/model/Comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  commentVal: string = '';

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: Dialog, private commentServiceService: CommentServiceService) { }

  annulerValidateCommand(comment: Comment) {
    this.commentServiceService.addComment(comment).subscribe();
  }

  saveCommentHoliday() {
    let comment = {} as Comment;
    comment.description = this.commentVal;
    comment.command = this.data.commandVal;
    this.annulerValidateCommand(comment);
    this._snackBar.open("commande valideé", '', {
      duration: 1000
    });
  }

  ngOnInit(): void {
    console.log("Command => ", this.data.commandVal);
  }

}

interface Dialog {
  commandVal: Command;
}
