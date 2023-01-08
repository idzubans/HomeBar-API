import { UserRole } from "src/users/UserRoleEnum";

export class GetUserDto {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  role: UserRole;
}