'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const routes = [
  {
    link: '/lesson-booking',
    name: 'Lessons',
  },
  {
    link: '/admin',
    name: 'Admin',
  },
]

export default function Navbar() {
  const path = usePathname()

  return (
    <div className="flex w-full items-center justify-center gap-3">
      {routes.map((route) => (
        <Link
          key={route.name}
          href={route.link}
          className={cn(path.endsWith(route.link) && 'text-blue-500')}
        >
          {route.name}
        </Link>
      ))}
    </div>
  )
}
