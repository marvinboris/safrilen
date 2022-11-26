import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { NextPageWithLayout } from '../_app'

import { useContentContext } from '../../app/contexts/content'
import { Publication } from '../../app/models'
import { PublicationInterface } from '../../app/models/publication'

import Layout, { Head } from '../../components/frontend/navigation/layout'
import BlogSideDrawer from '../../components/frontend/pages/blog/side-drawer'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

const BlogPage: NextPageWithLayout<{ publications: (PublicationInterface & { link?: string })[] }> = ({ publications }) => {
    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { publications: cms } } } } = content!

    const publicationsContent = publications.filter((p, i) => i < 10).map(publication => <div key={`publication-${publication.id}`}>
        <Link href={publication.link!} className="aspect-video block relative overflow-hidden rounded-[30px]">
            <Image fill src={publication.photo!} alt={publication.title} />
        </Link>

        <div className="py-4 space-y-2">
            <div className="flex items-end space-x-2">
                <div><ChatBubbleLeftEllipsisIcon className='w-8 text-primary' /></div>
                <Link href={publication.link!} className="text-3xl font-semibold">{publication.title}</Link>
            </div>
            <div>{publication.description}</div>
        </div>
    </div>)

    return <>
        <Head link='/blog' title={`${menu.blog} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

            <div className="container">
                <SectionBlock id="publications">
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                        <div className='space-y-6 lg:space-y-16 lg:col-span-3'>
                            {publicationsContent}
                        </div>

                        <BlogSideDrawer publications={publications.filter(publication => !publications.filter((p, i) => i < 10).map(p => p.id).includes(publication.id))} />
                    </div>
                </SectionBlock>
            </div>
        </main>
    </>
}

BlogPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export async function getServerSideProps() {
    const publications = await Publication.find()

    return { props: { publications: JSON.parse(JSON.stringify(publications.map(publication => publication.toObject()))) } }
}

export default BlogPage