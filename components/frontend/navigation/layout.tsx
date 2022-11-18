import NextHead from 'next/head'
import { ReactNode } from 'react'

import Footer from './footer'
import Toolbar from './toolbar'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return <div className='min-h-screen flex flex-col relative'>
        <Toolbar />

        <div className="main-wrapper">
            {children}
        </div>

        <Footer />
    </div>
}

interface PageParams {
    link: string
    title: string
    description: string
}

export const Head = ({ link, title, description }: PageParams) => <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={link} />

    <meta property='og:title' content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={link} />

    <meta property='twitter:title' content={title} />
    <meta property="twitter:description" content={description} />
</NextHead>