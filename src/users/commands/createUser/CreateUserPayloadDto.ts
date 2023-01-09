import { UserRole } from "src/users/UserRoleEnum";

export class CreateUserPayloadDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}