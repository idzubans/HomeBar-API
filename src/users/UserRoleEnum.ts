const UserRoles = ["ADMIN", "BARTENDER"] as const;
export type UserRole = typeof UserRoles[number];