import React, { ComponentProps, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { classNames } from '../../../../app/helpers/utils'

interface NavItemProps {
    exact?: boolean
    href: string
    children: ReactNode
    icon?: (props: ComponentProps<'svg'>) => JSX.Element
}

export default function NavItem({ href, icon: Icon, exact, children }: NavItemProps) {
    const router = useRouter()
    const active = exact ? router.pathname === href : router.pathname.startsWith(href)

    const content = <>
        {Icon && <span className='mr-[6.65px]'><Icon className="w-4 text-primary/20" /></span>}

        <span className={active ? 'relative after:inline-block after:ml-0.5 after:w-1 after:h-1 after:rounded-full after:bg-yellow' : ''}>{children}</span>
    </>

    return href.startsWith('#') ? <a href={href} className={classNames(active ? 'text-primary font-bold scale-105' : 'font-medium text-secondary-700 hover:text-primary', "truncate text-sm dark:text-secondary-200 dark:hover:text-primary inline-flex items-center hover:font-bold scale-100 hover:scale-105 transition-all duration-200")}>
        {content}
    </a> : <Link href={href} className={classNames(active ? 'text-primary font-bold scale-105' : 'font-medium text-secondary-700 hover:text-primary', "truncate text-sm dark:text-secondary-200 dark:hover:text-primary inline-flex items-center hover:font-bold scale-100 hover:scale-105 transition-all duration-200")}>
        {content}
    </Link>
}