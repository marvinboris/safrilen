import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import Layout, { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import ServiceBlock from '../../components/frontend/ui/blocks/service'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

import { useContentContext } from '../../app/contexts/content'

import { NextPageWithLayout } from '../_app'

const ServicesPage: NextPageWithLayout = () => {
    const router = useRouter()
    const slug = router.query.slug as string

    const { content } = useContentContext()
    const { services, cms: { global: { app_name }, frontend: { header: { menu }, pages: { services: cms } } } } = content!

    const service = services.find(service => service.slug === slug)
    const servicesContent = services.filter(_service => service && (_service._id !== service._id)).map(service => <div key={`service-${service._id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-3'>
        <ServiceBlock {...service} />
    </div>)

    return <>
        <Head link={`/services/${slug}`} title={`${service ? `${service.title} - ` : ''}${menu.services} | ${app_name}`} description={service ? service.body : cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={service ? service.title : cms.subtitle} />

            {service && <SectionBlock id="service">
                <div className="container">
                    <SectionTitle title={service.title} />

                    <div className="grid grid-cols-2 gap-6">
                        {service.photo && <div>
                            <Image width={1920} height={1920} src={service.photo} alt={service.title} className="rounded-[45px]" />
                        </div>}

                        <div>
                            <div dangerouslySetInnerHTML={{ __html: service.body }} />
                        </div>
                    </div>
                </div>
            </SectionBlock>}

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