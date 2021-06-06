import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISearchParam } from '../Model/SearchParams';
import { SearchService } from '../Service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<ISearchParam[]>();
  i = 0;
  searchParams: ISearchParam[];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchParams = this.searchService.get();
    this.i = this.searchParams.length;
  }

  add() {
    this.searchService.add(this.searchParams[this.i - 1]);
    this.ngOnInit();
  }

  dataOut() {
    this.newItemEvent.emit(this.searchParams);
  }

}
