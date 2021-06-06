import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion } from '../Model/Question';
import { QuestionService } from '../Service/question.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() question: IQuestion = <IQuestion>{};

  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
  }

  reply(s: string) {
    this.questionService.setLocalQuestion(s);
    this.router.navigate(["/posts/reply/" + this.question.questionId]);
  }

}
