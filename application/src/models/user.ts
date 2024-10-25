import { SkillLevel } from './skill-level'
import { UserRole } from './user-role'

export interface User {
  id: number
  name: string
  age: number
  email: string
  phone?: string
  profilePicture?: object

  skillLevelId?: number
  skillLevel?: SkillLevel

  userRoleId: number
  userRole?: UserRole
}
