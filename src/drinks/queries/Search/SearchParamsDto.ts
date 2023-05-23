export class SearchParamsDto {
  bartenderId: string;
  skip?: number;
  take?: number;
  categories?: string[];
  ingredients?: string[];
  searchString?: string;
}