import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from '../Model/Comment';
import { CommentService } from '../Service/comment.service';
import { QuestionService } from '../Service/question.service';

@Component({
  selector: 'app-new-reply',
  templateUrl: './new-reply.component.html',
  styleUrls: ['./new-reply.component.css']
})
export class NewReplyComponent implements OnInit {
  errorMessage!: string;
  comment: IComment;
  questionId: number;

  constructor(private questionService: QuestionService, private commentService: CommentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.comment = <IComment>{};
    this.getQuestion();
  }

  getQuestion(){
    this.comment.subject = "Re: " + this.questionService.getLocalQuestion();
    const param = this.route.snapshot.paramMap.get("id");
    if (param) {
      this.questionId = + param;
    }
  }

  post(comment: IComment) {
    this.commentService.postComment(comment, this.questionId).subscribe({
      next: res => this.comment = <IComment>{},
      error: err => this.errorMessage = err
    });
  }

}
