import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { clerkClient } from '@/lib/clerk-client'
import { Button } from '@/components/shadcn-ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <div className="flex h-screen w-screen items-center justify-center">
              <SignIn routing="hash" />
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton showName />
            <Providers>{children}</Providers>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}
