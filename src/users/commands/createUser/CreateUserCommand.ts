import { CreateUserPayloadDto } from "./CreateUserPayloadDto";

export class CreateUserCommand {
  Payload: CreateUserPayloadDto;

  constructor(request: CreateUserPayloadDto) {
    this.Payload = request;
  }
}