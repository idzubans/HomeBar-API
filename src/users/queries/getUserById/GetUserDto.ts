import { UserRole } from "src/users/UserRoleEnum";

export class GetUserDto {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}