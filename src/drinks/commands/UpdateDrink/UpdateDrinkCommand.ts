import { DrinkPayloadDto } from "../DrinkPayloadDto";

export class UpdateDrinkCommand {
  payload: DrinkPayloadDto;
  userId?: string;
  drinkId: string;

  constructor(request: DrinkPayloadDto, drinkId: string, userId?: string) {
    this.payload = request;
    this.userId = userId;
    this.drinkId = drinkId;
  }
}