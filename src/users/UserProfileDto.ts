import { UserRole } from "./UserRoleEnum";

export class UserProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}