import { OmitType } from "@nestjs/swagger"

export class UserDto {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  role: UserRole;
}

export class CreateUserPayloadDto extends OmitType(UserDto, ['id'] as const) {}
export class GetUserDto extends OmitType(UserDto, ['password'] as const) {}

const UserRoles = ["ADMIN", "BARTENDER"] as const;
type UserRole = typeof UserRoles [number];