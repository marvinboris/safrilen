import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { NextPageWithLayout } from '../_app'
import { useContentContext } from '../../app/contexts/content'
import { Publication } from '../../app/models'
import { PublicationInterface } from '../../app/models/publication'

import Layout, { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import PublicationBlock from '../../components/frontend/ui/blocks/publication'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'
import Input from '../../components/frontend/ui/form/input'
import BlogSideDrawer from '../../components/frontend/pages/blog/side-drawer'

const PublicationPage: NextPageWithLayout<{ publications: PublicationInterface[] }> = ({ publications }) => {
    const router = useRouter()
    const slug = router.query.slug as string

    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { publications: cms } } } } = content!

    const publication = publications.find(publication => publication.slug === slug)

    return <>
        <Head link={`/blog/${slug}`} title={`${publication ? `${publication.title} - ` : ''}${menu.blog} | ${app_name}`} description={publication ? publication.body : cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={publication ? publication.title : cms.subtitle} />

            <div className="container">
                <SectionBlock>
                    <SectionTitle title={publication!.title} />
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
                        {publication && <div className='lg:col-span-3'>
                            {publication.photo && <div>
                                <Image width={1920} height={1920} src={publication.photo} alt={publication.title} className="rounded-[30px]" />
                            </div>}

                            <div className='space-y-4 mt-5'>
                                <div className='font-medium text-lg'>{publication.description}</div>
                                <div dangerouslySetInnerHTML={{ __html: publication.body }} />
                            </div>
                        </div>}

                        <BlogSideDrawer publications={publications.filter(_publication => publication && (_publication.id !== publication.id))} />
                    </div>
                </SectionBlock>
            </div>
        </main>
    </>
}

PublicationPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export async function getServerSideProps() {
    const publications = await Publication.find()

    return { props: { publications: JSON.parse(JSON.stringify(publications.map(publication => publication.toObject()))) } }
}

export default PublicationPage