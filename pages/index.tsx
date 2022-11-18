import { ArrowRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps, ReactElement, useEffect, useState } from 'react'

import SocialNetworks from '../components/frontend/navigation/footer/social-networks'
import Layout, { Head } from '../components/frontend/navigation/layout'
import ImageBlock from '../components/frontend/ui/blocks/image'
import SectionBlock from '../components/frontend/ui/blocks/section'
import ServiceBlock from '../components/frontend/ui/blocks/service'
import TestimonialBlock from '../components/frontend/ui/blocks/testimonial'
import Button from '../components/frontend/ui/form/button'
import SectionTitle from '../components/frontend/ui/title/section'

import { useContentContext } from '../app/contexts/content'
import { ImageInterface } from '../app/models/image'
import { TestimonialInterface } from '../app/models/testimonial'

import { NextPageWithLayout } from './_app'

type HomeDataType = { images: ImageInterface[], testimonials: TestimonialInterface[] }

const Li = (props: ComponentProps<'li'>) => <li className='flex' {...props}>
  <CheckIcon className='w-4 mr-2 text-primary' />{props.children}
</li>

const HomePage: NextPageWithLayout = () => {
  const { content } = useContentContext()
  const { services, cms: { global: { app_name, contact }, frontend: { pages: { home: cms } } } } = content!

  const [home, setHome] = useState<HomeDataType | null>(null)

  const servicesContent = services.filter((_service, i) => i < 3).map(service => <div key={`service-${service._id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-3'>
    <ServiceBlock {...service} />
  </div>)

  useEffect(() => {
    if (!home) axios.get<HomeDataType>('/api/frontend/home').then(res => setHome(res.data))
  }, [home])
  const galleryContent = (home ? home.images : []).map((image: ImageInterface, index: number) => <ImageBlock key={`image-${image.photo}-${index}`} {...image} />)

  const testimoniesContent = []
  const renderTestimony = (testimony: TestimonialInterface, index: number) => <TestimonialBlock key={`testimony-${testimony.body}-${index}`} {...testimony} />
  if (home) for (let i = 0; i < Math.ceil(home.testimonials.length / 2); i++) {
    testimoniesContent.push(<li key={`testimoniesContent-${i}`}>
      <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
        {renderTestimony(home.testimonials[2 * i], 2 * i)}
        {(home.testimonials.length > 2 * i + 1) && renderTestimony(home.testimonials[2 * i + 1], 2 * i + 1)}
      </ul>
    </li>)
  }

  return <>
    <Head link='/' title={app_name} description={cms.about.description} />
    <main>
      <header className='py-40 lg:py-52 relative flex flex-col items-center justify-center text-center text-white z-0'>
        <Image fill src='/images/frontend/danilo-alvesd-AzqJSCPkZkI-unsplash.jpg' alt='Bannière' className='absolute inset-0 image-cover -z-20' />
        <div className='bg-grid-primary/[0.05] absolute -z-10 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-primary/70 after:to-primary/30 after:-z-20 inset-0' />

        <div className="container">
          <h1 className='mx-auto max-w-4xl font-display text-5xl font-extrabold tracking-tight sm:text-7xl'>{cms.banner.title}</h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight">{cms.banner.subtitle}</p>
        </div>
      </header>

      <SectionBlock id='about' className="flex items-center">
        <div className='container'>
          <div className='grid md:gap-12 md:grid-cols-2'>
            <div>
              <SectionTitle head={cms.about.head} title={cms.about.title} />

              <div className="mb-5">{cms.about.description}</div>

              <ul className='mb-6 md:mb-14'>{cms.about.services.map((service, i) => <Li key={`home-about-service-${i}`}>{service}</Li>)}</ul>

              <div className="hidden md:block">
                <Link href='/about'><Button icon={ArrowRightIcon}>{cms.about.read_more}</Button></Link>
              </div>
            </div>

            <div>
              <div className='relative pl-[34.79px] pr-[36.81px] pb-[38px]'>
                <div className="aspect-square md:aspect-[4/3] relative">
                  <Image fill src="/images/frontend/mh-tri-TadNRJiOHB4-unsplash.jpg" alt="Banner" className="absolute rounded-[45px] top-0 z-20 image-cover" />
                </div>

                <div className="absolute z-0 bottom-0 left-0 rounded-[38.0488px] bg-orange/10 shadow-lg shadow-orange/10 ratio-4by3 w-2/5" />
                <div className="absolute z-0 top-0 right-0 rounded-[45px] bg-primary/10 shadow-lg shadow-primary/10 ratio-4by3 w-3/5" />
              </div>

              <div className="text-center mt-[39.13px] md:hidden">
                <Link href='/about'><Button icon={ArrowRightIcon}>{cms.about.read_more}</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="services" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
        <div className="container">
          <SectionTitle centered head={cms.services.head} title={cms.services.title} />

          <div className="flex flex-nowrap md:flex-wrap overflow-auto -mx-3 mb-6">
            {servicesContent}
          </div>

          <div className='text-center'>
            <Link href='/services'><Button icon={ArrowRightIcon}>{cms.services.view_all}</Button></Link>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="testimonials">
        <div className="container">
          <div className="lg:flex flex-wrap items-center lg:-mx-3">
            <div className="order-1 lg:order-2 lg:w-6/12 xl:w-5/12 lg:px-3">
              <SectionTitle centered head={cms.testimonials.head} title={cms.testimonials.title} />

              <ul role="list" className="grid grid-cols-1 gap-6">
                {testimoniesContent}
              </ul>
            </div>

            <div className="order-2 lg:order-1 mt-16 lg:mt-0 lg:w-6/12 xl:w-7/12 lg:px-3">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                {galleryContent}
              </div>
            </div>
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

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default HomePage