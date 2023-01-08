import { UserRole } from "src/users/UserRoleEnum";

export class CreateUserPayloadDto {
  email: string;
  password: string;
  name: string;
  surname: string;
  role: UserRole;
}