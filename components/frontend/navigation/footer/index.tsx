import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { useContentContext } from '../../../../app/contexts/content'

type LinkProps = {
    href: string
}

const Facebook = ({ href }: LinkProps) => <Link href={href}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2639 28.6666H17.5973V17.9867H22.4027L22.9306 12.6796H17.5973V9.99992C17.5973 9.26355 18.1942 8.66659 18.9306 8.66659H22.9306V3.33325H18.9306C15.2486 3.33325 12.2639 6.31803 12.2639 9.99992V12.6796H9.59719L9.06934 17.9867H12.2639V28.6666Z" fill="currentColor" />
    </svg>
</Link>

const Twitter = ({ href }: LinkProps) => <Link href={href}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_529_642)">
            <path d="M29.3334 5.34668C28.0001 6.00002 26.6934 6.26535 25.3334 6.66668C23.8387 4.98002 21.6227 4.88668 19.4934 5.68402C17.3641 6.48135 15.9694 8.43068 16.0001 10.6667V12C11.6734 12.1107 7.82008 10.14 5.33341 6.66668C5.33341 6.66668 -0.242585 16.5774 10.6667 21.3334C8.17075 22.996 5.68141 24.1174 2.66675 24C7.07741 26.404 11.8841 27.2307 16.0454 26.0227C20.8187 24.636 24.7414 21.0587 26.2467 15.7C26.6958 14.0702 26.9188 12.3865 26.9094 10.696C26.9067 10.364 28.9227 7.00002 29.3334 5.34535V5.34668Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_529_642">
                <rect width="32" height="32" fill="currentColor" />
            </clipPath>
        </defs>
    </svg>
</Link>

const LinkedIn = ({ href }: LinkProps) => <Link href={href}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_529_645)">
            <path d="M9.25326 6.66678C9.2529 7.37402 8.97161 8.05216 8.47126 8.55201C7.97092 9.05185 7.2925 9.33247 6.58526 9.33211C5.87801 9.33176 5.19987 9.05047 4.70003 8.55012C4.20018 8.04977 3.91957 7.37136 3.91992 6.66411C3.92028 5.95687 4.20157 5.27873 4.70191 4.77889C5.20226 4.27904 5.88068 3.99843 6.58792 3.99878C7.29517 3.99913 7.9733 4.28042 8.47315 4.78077C8.973 5.28112 9.25361 5.95954 9.25326 6.66678V6.66678ZM9.33326 11.3068H3.99992V28.0001H9.33326V11.3068ZM17.7599 11.3068H12.4533V28.0001H17.7066V19.2401C17.7066 14.3601 24.0666 13.9068 24.0666 19.2401V28.0001H29.3333V17.4268C29.3333 9.20011 19.9199 9.50678 17.7066 13.5468L17.7599 11.3068V11.3068Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_529_645">
                <rect width="32" height="32" fill="currentColor" />
            </clipPath>
        </defs>
    </svg>

</Link>

const Instagram = ({ href }: LinkProps) => <Link href={href}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_529_649)">
            <path d="M21.3333 5.33325H10.6666C7.72107 5.33325 5.33325 7.72107 5.33325 10.6666V21.3333C5.33325 24.2788 7.72107 26.6666 10.6666 26.6666H21.3333C24.2788 26.6666 26.6666 24.2788 26.6666 21.3333V10.6666C26.6666 7.72107 24.2788 5.33325 21.3333 5.33325Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 10V10.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_529_649">
                <rect width="32" height="32" fill="currentColor" />
            </clipPath>
        </defs>
    </svg>
</Link>


interface SectionBlockProps {
    head: ReactNode
    title: ReactNode
    children: ReactNode
    className?: string
}

const SectionBlock = ({ title, head, children, className }: SectionBlockProps) => <div className={className}>
    <div className="font-semibold text-yellow text-sm sm:text-base">{head}</div>

    <h3 className='text-primary text-lg sm:text-xl font-extrabold tracking-tight'>{title}</h3>

    <div className='mt-3'>{children}</div>
</div>

export default function Footer() {
    const { content } = useContentContext()
    const { services, cms: { global: { app_name, company_name, contact: { email, phone, social_networks } }, frontend: { footer: { top, bottom } } } } = content!

    return <footer>
        <div className="py-8">
            <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <SectionBlock head={top.navigation.head} title={top.navigation.title}>
                    {Object.entries(top.navigation.menu).map(([key, value]) => <div key={`footer-top-navigation-menu-${key}-${value}`}><Link href={`/${key}`}>{value}</Link></div>)}
                </SectionBlock>

                <SectionBlock head={top.services.head} title={top.services.title}>
                    {services.map(service => <div key={`footer-top-services-${service._id}`}><Link href={service.link}>{service.title}</Link></div>)}
                </SectionBlock>

                <SectionBlock head={top.contact.head} title={top.contact.title} className="sm:col-span-2 lg:col-span-1">
                    <div className='space-y-2'>
                        <div className="flex">
                            <div>
                                <div className="w-7">
                                    <MapPinIcon className='text-primary w-5' />
                                </div>
                            </div>

                            <div>
                                {top.contact.address}
                            </div>
                        </div>

                        <div className="flex">
                            <div>
                                <div className="w-7">
                                    <EnvelopeIcon className='text-primary w-5' />
                                </div>
                            </div>

                            <div>{email}</div>
                        </div>

                        <div className="flex">
                            <div>
                                <div className="w-7">
                                    <PhoneIcon className='text-primary w-5' />
                                </div>
                            </div>

                            <div>{phone}</div>
                        </div>
                    </div>
                </SectionBlock>
            </div>
        </div>

        <div className="py-8">
            <div className="container space-y-3 lg:space-y-0 lg:flex items-center">
                <div className='flex items-center justify-center space-x-3'>
                    <span>{new Date().getFullYear()} <span className='font-bold text-yellow'>{app_name}</span>. {bottom.all_rights} <span className='font-bold text-primary'>{company_name}</span>.</span>
                </div>

                <div className="ml-auto flex items-start justify-center space-x-10">
                    <Facebook href={social_networks.facebook} />
                    <Twitter href={social_networks.twitter} />
                    <LinkedIn href={social_networks.linkedin} />
                    <Instagram href={social_networks.instagram} />
                </div>
            </div>
        </div>
    </footer>
}