import { ReactElement } from 'react'

import Layout, { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import ServiceBlock from '../../components/frontend/ui/blocks/service'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

import { useContentContext } from '../../app/contexts/content'

import { NextPageWithLayout } from '../_app'


const ServicesPage: NextPageWithLayout = () => {
    const { content } = useContentContext()
    const { services, cms: { global: { app_name }, frontend: { header: { menu }, pages: { services: cms } } } } = content!

    const servicesContent = services.map(service => <div key={`service-${service._id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-3'>
        <ServiceBlock {...service} />
    </div>)

    return <>
        <Head link='/services' title={`${menu.services} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

            <SectionBlock id="services" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
                <div className="container">
                    <SectionTitle centered head={cms.services.head} title={cms.services.title} />

                    <div className="flex flex-wrap -mx-3">
                        {servicesContent}
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

ServicesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ServicesPage