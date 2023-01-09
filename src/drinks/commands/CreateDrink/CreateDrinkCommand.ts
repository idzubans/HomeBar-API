import { CreateDrinkPayloadDto } from "./CreateDrinkPayloadDto";

export class CreateDrinkCommand {
  payload: CreateDrinkPayloadDto;
  userId?: string;

  constructor(request: CreateDrinkPayloadDto, userId?: string) {
    this.payload = request;
    this.userId = userId;
  }
}