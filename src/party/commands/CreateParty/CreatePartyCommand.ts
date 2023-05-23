import { CreatePartyPayloadDto } from "./CreatePartyPayloadDto";

export class CreatePartyCommand {
  bartenderId: string
  Payload: CreatePartyPayloadDto;

  constructor(request: CreatePartyPayloadDto, bartenderId: string) {
    this.Payload = request;
    this.bartenderId = bartenderId;
  }
}