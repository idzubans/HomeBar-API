import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma/PrismaService";
import { CreateUserCommand } from "./CreateUserCommand";
import { hash } from 'bcrypt';
import { UserProfileDto } from "src/users/UserProfileDto";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private prisma: PrismaService) { }

  async execute(command: CreateUserCommand): Promise<UserProfileDto> {
    const result = await this.prisma.user.create({
      data: {
        email: command.Payload.email,
        name: command.Payload.name,
        surname: command.Payload.surname,
        role: command.Payload.role,
        password: await hash(command.Payload.password, 10)
      }
    });

    return {
      email: result.email,
      name: result.name,
      id: result.id,
      surname: result.surname,
      role: result.role
    };
  }
}