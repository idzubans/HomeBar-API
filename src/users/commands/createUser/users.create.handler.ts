import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserCommand } from "./users.create.command";
import { hash } from 'bcrypt';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private prisma: PrismaService) {}

  async execute(command: CreateUserCommand) {
    console.log(command.Payload)
    return this.prisma.user.create({
      data: {
        email: command.Payload.email,
        name: command.Payload.name,
        surname: command.Payload.surname,
        role: command.Payload.role,
        password: await hash(command.Payload.password, 10)
      }
    });
  }
}