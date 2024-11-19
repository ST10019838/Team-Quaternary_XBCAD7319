'use server'

import { clerkClient } from '@/lib/clerk-client'
import { User } from '@clerk/nextjs/server'

export async function getUsers() {
  const response = await clerkClient.users.getUserList()

  return response
}

export async function createUser({ userData }: { userData: User }) {
  // {
  //   firstName: 'Test',
  //   lastName: 'User',
  //   emailAddress: ['testclerk123@gmail.com'],
  //   password: 'password',
  // }

  const response = await clerkClient.users.createUser({})

  return response
}

export async function updateUser() {
  const userId = 'user_123'

  const params = { firstName: 'John', lastName: 'Wick' }

  const response = await clerkClient.users.updateUser(userId, params)

  return response
}

export async function deleteUser() {
  const userId = 'user_123'

  const response = await clerkClient.users.deleteUser(userId)

  return response
}
