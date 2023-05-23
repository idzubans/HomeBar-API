import { SearchParamsDto } from "./SearchParamsDto";

export class SearchDrinksQuery {
  searchParams: SearchParamsDto;

  constructor(searchParams: SearchParamsDto) {
    this.searchParams = searchParams;
  }
}