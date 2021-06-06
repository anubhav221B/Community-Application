import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../Model/Question';
import { ISearchParam } from '../Model/SearchParams';
import { QuestionService } from '../Service/question.service';
import { SearchService } from '../Service/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  questions!: IQuestion[];
  errorMessage!: string;


  constructor(private searchService: SearchService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.convertToRequestObject(this.searchService.get());
  }

  convertToRequestObject(params: ISearchParam[]) {
    let jsonObject = {};
    params.forEach(item => jsonObject[item.select] = item.search);
    let json = JSON.stringify(jsonObject);
    this.getQuestions(jsonObject);
  }

  getQuestions(searchParams: object) {
    this.questionService.searchQuestion(searchParams).subscribe({
      next: res => {
        this.questions = res
        this.errorMessage = "";
      },
      error: err => {
        this.errorMessage = err;
        this.questions = [];
      }
    });
  }

  search(params: ISearchParam[]) {
    this.convertToRequestObject(params);
  }

}
