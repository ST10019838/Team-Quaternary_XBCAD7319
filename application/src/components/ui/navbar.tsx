'use client'

import { cn } from '@/lib/utils'
import { BookCheck, UserCog } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../shadcn-ui/button'

const routes = [
  {
    link: '/lesson-booking',
    name: 'Lessons',
    icon: <BookCheck className="size-4" />,
    placeDivider: true,
  },
  {
    link: '/admin',
    name: 'Admin',
    icon: <UserCog className="size-4" />,
  },
]

export default function Navbar() {
  const path = usePathname()

  return (
    <div className="flex w-full items-center justify-center gap-3">
      {routes.map((route) => (
        <>
          <Button
            variant={path.endsWith(route.link) ? 'default' : 'ghost'}
            size="sm"
            key={route.name}
            asChild
          >
            <Link href={route.link} className={cn('flex items-center gap-2')}>
              {route.icon}
              {route.name}
            </Link>
          </Button>
        </>
      ))}
    </div>
  )
}
