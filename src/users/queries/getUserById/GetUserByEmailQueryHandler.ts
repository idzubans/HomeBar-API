import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma/PrismaService";
import { GetUserByEmailQuery } from "./GetUserByEmailQuery";
import { GetUserDto } from "./GetUserDto";

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(private prisma: PrismaService) { }

  async execute(query: GetUserByEmailQuery): Promise<GetUserDto> {
    const response = await this.prisma.user.findFirst({ where: { email: query.email } });
    return {
      id: response.id,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      role: response.role,
      password: response.password
    };
  }
}