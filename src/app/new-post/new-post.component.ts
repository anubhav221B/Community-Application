import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion } from '../Model/Question';
import { QuestionService } from '../Service/question.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  question: IQuestion;
  errorMessage: String;

  constructor(private router: Router, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.question = <IQuestion>{};
  }

  postQuestion(postQuestion: IQuestion): void {
    this.questionService.postQuestion(postQuestion).subscribe({
      next: res => {
        this.question = <IQuestion>{};
        this.router.navigate(["/myPost"]);
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

}
