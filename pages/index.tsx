import { ArrowRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { Carousel } from 'flowbite-react'
import NextImage from 'next/image'
import Link from 'next/link'
import { ComponentProps, ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../app/contexts/content'
import { useWindowSize } from '../app/hooks'
import { Image, Testimonial } from '../app/models'
import { ImageInterface } from '../app/models/image'
import { TestimonialInterface } from '../app/models/testimonial'

import SocialNetworks from '../components/frontend/navigation/footer/social-networks'
import Layout, { Head } from '../components/frontend/navigation/layout'
import ImageBlock from '../components/frontend/ui/blocks/image'
import SectionBlock from '../components/frontend/ui/blocks/section'
import ServiceBlock from '../components/frontend/ui/blocks/service'
import TestimonialBlock from '../components/frontend/ui/blocks/testimonial'
import Button from '../components/frontend/ui/form/button'
import SectionTitle from '../components/frontend/ui/title/section'

import { NextPageWithLayout } from './_app'

type HomeDataType = { images: ImageInterface[], testimonials: TestimonialInterface[] }

const Li = (props: ComponentProps<'li'>) => <li className='flex' {...props}>
  <CheckIcon className='w-4 mr-2 text-primary' />{props.children}
</li>

const HomePage: NextPageWithLayout<{ home: HomeDataType }> = ({ home }) => {
  const { width } = useWindowSize()

  const { content } = useContentContext()
  const { services, cms: { global: { app_name, contact }, frontend: { pages: { home: cms } } } } = content!

  const servicesContent = services.filter((_service, i) => i < 3).map(service => <div key={`service-${service._id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-2 md:px-3'>
    <ServiceBlock {...service} />
  </div>)

  const carouselContent = [
    '/images/gallery/hobi-industri-NLBJ2I0lNr4-unsplash.jpg',
    '/images/frontend/danilo-alvesd-AzqJSCPkZkI-unsplash.jpg',
    '/images/gallery/thomas-kelley-xVptEZzgVfo-unsplash.jpg',
  ].map(src => <div key={`carousel-item-${src}`} className='before:absolute before:inset-0 before:bg-grid-white/[0.05] before:z-20 after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary/70 after:to-primary/30 after:z-10 w-full h-full'>
    <NextImage width={1920} height={1920} src={src} alt='Bannière' className='image-cover' />
  </div>)

  const galleryContent = home.images.map((image: ImageInterface, index: number) => <ImageBlock key={`image-${image.photo}-${index}`} {...image} />)

  const testimoniesContent = []
  const renderTestimony = (testimony: TestimonialInterface, index: number) => <TestimonialBlock key={`testimony-${testimony.body}-${index}`} {...testimony} />
  for (let i = 0; i < Math.ceil(home.testimonials.length / 2); i++) {
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
        <div className='absolute inset-0 -z-20'>
          <Carousel
            leftControl={width !== undefined && width > 768 ? undefined : <></>}
            rightControl={width !== undefined && width > 768 ? undefined : <></>}>
            {carouselContent}
          </Carousel>
        </div>

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
              <div className='relative md:pl-[34.79px] md:pr-[36.81px] md:pb-[38px]'>
                <div className="aspect-square md:aspect-[4/3] relative">
                  <NextImage fill src="/images/frontend/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station_627829-4822.jpg" alt="Banner" className="absolute rounded-[30px] top-0 z-20 image-cover" />
                </div>

                <div className="absolute z-0 bottom-0 left-0 rounded-[38.0488px] bg-orange/10 shadow-lg shadow-orange/10 ratio-4by3 w-2/5" />
                <div className="absolute z-0 top-0 right-0 rounded-[30px] bg-primary/10 shadow-lg shadow-primary/10 ratio-4by3 w-3/5" />
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

          <div className="flex flex-nowrap md:flex-wrap overflow-auto -mx-7 px-5 md:px-4 mb-6">
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
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-6">
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

export async function getServerSideProps() {
  const images = await Image.find().limit(12)
  const testimonials = await Testimonial.find().limit(3)

  const home = JSON.parse(JSON.stringify({
    images: images.map(image => image.toObject()),
    testimonials: testimonials.map(testimonial => testimonial.toObject()),
  }))

  return { props: { home } }
}

export default HomePage