import { Injectable } from '@angular/core';
import { ISearchParam } from '../Model/SearchParams';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchParams: ISearchParam[]=[<ISearchParam>{select:""}];
  i = 0;

  add(searchParam: ISearchParam){
    this.searchParams[this.i] = searchParam;
    this.i +=1;
    this.searchParams[this.i] = <ISearchParam>{select:""};
  }

  get(){
    return this.searchParams;
  }
  constructor() {
   }
}
