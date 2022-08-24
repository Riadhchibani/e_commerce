import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommandService } from 'src/app/command.service';
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
  public name: string = "";
  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private commandService: CommandService,private commentServiceService: CommentServiceService, private routerService: ActivatedRoute) { }

  annulerValidateCommand(comment: Comment) {
    this.commentServiceService.addComment(comment).subscribe();
  }

  async saveCommentHoliday() {
    let comment = {} as Comment;
    comment.description = this.commentVal;
    comment.command = this.data;
    console.log(comment);
    //this.annulerValidateCommand(comment);
    await this.commandService.validateCommand(this.data).toPromise();
    this._snackBar.open("commande valideé", '', {
      duration: 1000
    });
  }

  ngOnInit(): void {
    console.log("Command => ", this.data);
  }

}

interface Dialog {
  commandVal: Command;
}
