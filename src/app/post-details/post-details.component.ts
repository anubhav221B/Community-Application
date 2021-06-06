import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IQuestion } from '../Model/Question';
import { IUser } from '../Model/User';
import { CommentService } from '../Service/comment.service';
import { QuestionService } from '../Service/question.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  errorMessage!: string;
  localUser: IUser;
  question: Observable<IQuestion>;

  constructor(private questionService: QuestionService, private commentService: CommentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem("user"));
    const param = this.route.snapshot.paramMap.get("id");
    if (param) {
      const id = + param;
      this.getQuestion(id);
    }
  }

  getQuestion(id: number) {
    this.question= this.questionService.getQuestion(id);
    this.question.subscribe({
      error: err => this.errorMessage = err
    });
  }

  like(id: number) {
    this.commentService.likeComment(id).subscribe({
      next: res => location.reload(),
      error: err => this.errorMessage = err
    });
  }

  correct(id: number) {
    this.commentService.correctComment(id).subscribe({
      next: res => location.reload(),
      error: err => this.errorMessage = err
    });
  }

}
