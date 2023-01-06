import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma/prisma.service";
import { GetUserDto, UserDto } from "src/users/users.dto";
import { GetUserByEmailQuery } from "./users.get-by-email.query";

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(private prisma: PrismaService) {}

  async execute(query: GetUserByEmailQuery) : Promise<UserDto> {
    const response = await this.prisma.user.findFirst({ where: { email: query.email }});
    const dto: UserDto = {
      id: response.id,
      email: response.email,
      name: response.name,
      surname: response.surname,
      role: response.role,
      password: response.password
    }
    return dto;
  }
}