import { CreateUserPayloadDto } from "../../users.dto";

export class CreateUserCommand {
  Payload: CreateUserPayloadDto;

  constructor(request: CreateUserPayloadDto) {
    this.Payload = request;
  }
}