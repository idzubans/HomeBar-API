import { DrinkPayloadDto } from "../DrinkPayloadDto";

export class CreateDrinkCommand {
  payload: DrinkPayloadDto;
  userId?: string;

  constructor(request: DrinkPayloadDto, userId?: string) {
    this.payload = request;
    this.userId = userId;
  }
}