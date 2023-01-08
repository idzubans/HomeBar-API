import { UserRole } from "./UserRoleEnum";

export class UserProfileDto {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: UserRole;
}