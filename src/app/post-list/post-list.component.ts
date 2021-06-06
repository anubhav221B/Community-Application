import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../Model/Question';
import { QuestionService } from '../Service/question.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  questions!: IQuestion[];
  errorMessage!: string;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe({
      next: res => this.questions = res,
      error: err => this.errorMessage = err
    });
  }

}
