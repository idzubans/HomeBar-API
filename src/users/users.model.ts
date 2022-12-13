import { Role } from "@prisma/client"

export interface CreateUserRequest {
  email: string
  password: string
  name?: string
  surname?: string
  role: Role
}

export interface UserModel {
  email: string
  name?: string
  surname?: string
  role: Role
  createdAt: Date
  updatedAt: Date
}