import { ArrowRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps, ReactElement } from 'react'

import SocialNetworks from '../components/frontend/navigation/footer/social-networks'
import Layout, { Head } from '../components/frontend/navigation/layout'
import SectionBlock from '../components/frontend/ui/blocks/section'
import ServiceBlock from '../components/frontend/ui/blocks/service'
import Button from '../components/frontend/ui/form/button'
import PageTitle from '../components/frontend/ui/title/page'
import SectionTitle from '../components/frontend/ui/title/section'

import { useContentContext } from '../app/contexts/content'

import { NextPageWithLayout } from './_app'

const Li = (props: ComponentProps<'li'>) => <li className='flex' {...props}>
    <CheckIcon className='w-4 mr-2 text-primary' />{props.children}
</li>

const AboutPage: NextPageWithLayout = () => {
    const { content } = useContentContext()
    const { services, cms: { global: { app_name, contact }, frontend: { header: { menu }, pages: { about: cms } } } } = content!

    const servicesContent = services.filter((_service, i) => i < 3).map(service => <div key={`service-${service._id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-3'>
        <ServiceBlock white {...service} />
    </div>)

    return <>
        <Head link='/about' title={`${menu.about} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

            <SectionBlock id='about' className="flex items-center">
                <div className='container'>
                    <div className='grid md:gap-12 md:grid-cols-2'>
                        <div>
                            <div className='relative pl-[34.79px] pr-[36.81px] pb-[38px]'>
                                <div className="aspect-square md:aspect-[4/3] relative">
                                    <Image fill src="/images/frontend/mh-tri-TadNRJiOHB4-unsplash.jpg" alt="Banner" className="absolute rounded-[45px] top-0 z-20 image-cover" />
                                </div>

                                <div className="absolute z-0 bottom-0 left-0 rounded-[38.0488px] bg-orange/10 shadow-lg shadow-orange/10 ratio-4by3 w-2/5" />
                                <div className="absolute z-0 top-0 right-0 rounded-[45px] bg-primary/10 shadow-lg shadow-primary/10 ratio-4by3 w-3/5" />
                            </div>
                        </div>

                        <div>
                            <SectionTitle head={cms.about.head} title={cms.about.title} />

                            <div className="mb-5">{cms.about.description}</div>

                            <ul className='mb-6 md:mb-14'>{cms.about.services.map((service, i) => <Li key={`about-about-service-${i}`}>{service}</Li>)}</ul>
                        </div>
                    </div>
                </div>
            </SectionBlock>

            <SectionBlock id="services" className="before:absolute before:bg-grid-white/[0.05] before:inset-0 before:-z-10 relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-primary after:to-primary/60 after:-z-20">
                <div className="container">
                    <SectionTitle white centered head={cms.services.head} title={cms.services.title} />

                    <div className="flex flex-nowrap md:flex-wrap overflow-auto -mx-3 mb-6">
                        {servicesContent}
                    </div>

                    <div className='text-center'>
                        <Link href='/services'><Button color='white' icon={ArrowRightIcon}>{cms.services.view_all}</Button></Link>
                    </div>
                </div>
            </SectionBlock>

            <SectionBlock id="contact" className='bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10'>
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="order-2 md:order-1 mt-[31px] md:mt-0 pb-[49px] md:pb-0">
                            <div className='aspect-video rounded-[27.759px] shadow-lg overflow-hidden relative'>
                                <iframe src={contact.map} className="w-full h-full absolute inset-0 bg-white" />
                            </div>
                        </div>

                        <div className="order-1 md:order-2">
                            <SectionTitle head={cms.contact.head} title={cms.contact.title} />

                            <div className='space-y-6'>
                                <div className="flex">
                                    <div>
                                        <div className="w-12">
                                            <MapPinIcon className='text-primary w-7' />
                                        </div>
                                    </div>

                                    <div>
                                        {cms.contact.address}
                                    </div>
                                </div>

                                <div className="flex">
                                    <div>
                                        <div className="w-12">
                                            <EnvelopeIcon className='text-primary w-7' />
                                        </div>
                                    </div>

                                    <div>{contact.email}</div>
                                </div>

                                <div className="flex">
                                    <div>
                                        <div className="w-12">
                                            <PhoneIcon className='text-primary w-7' />
                                        </div>
                                    </div>

                                    <div>{contact.phone}</div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <SocialNetworks />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default AboutPage