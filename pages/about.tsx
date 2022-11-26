import { ArrowRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, ComponentProps, FormEvent, ReactElement, useState } from 'react'

import SocialNetworks from '../components/frontend/navigation/footer/social-networks'
import Layout, { Head } from '../components/frontend/navigation/layout'
import SectionBlock from '../components/frontend/ui/blocks/section'
import ServiceBlock from '../components/frontend/ui/blocks/service'
import Button from '../components/frontend/ui/form/button'
import PageTitle from '../components/frontend/ui/title/page'
import SectionTitle from '../components/frontend/ui/title/section'

import { useContentContext } from '../app/contexts/content'

import { NextPageWithLayout } from './_app'
import Alert from '../components/frontend/ui/alert'
import Status from '../app/types/enums/status'
import Input from '../components/frontend/ui/form/input'
import MessageType from '../app/types/message'
import axios from 'axios'

const initialState = {
    firstName: '',
    email: '',
}

const Li = (props: ComponentProps<'li'>) => <li className='flex' {...props}>
    <CheckIcon className='w-4 mr-2 text-primary' />{props.children}
</li>

const Article = (props: ComponentProps<'article'> & { title: string }) => <article {...props}>
    <div className="mb-1 text-primary font-semibold">{props.title}</div>

    <div>
        {props.children}
    </div>
</article>

const AboutPage: NextPageWithLayout = () => {
    const { content } = useContentContext()
    const { services, cms: { global: { app_name, contact }, frontend: { header: { menu }, pages: { about: cms } } } } = content!

    const [status, setStatus] = useState(Status.IDLE)
    const [message, setMessage] = useState<MessageType | null>(null)
    const [value, setValue] = useState({ ...initialState })
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (status === Status.LOADING) return
        try {
            setStatus(Status.LOADING)
            const res = await axios.post<{message: MessageType}>('/api/frontend/newsletter', value)
            setMessage(res.data.message)
            setStatus(Status.IDLE)
            setValue({ ...initialState })
        } catch (error) {
            setMessage({ type: 'danger', content: (error as Error).message })
            setStatus(Status.FAILED)
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setValue(v => ({ ...v, [name]: value }))
    }

    const servicesContent = services.filter((_service, i) => i < 3).map(service => <div key={`service-${service._id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-2 md:px-3'>
        <ServiceBlock white {...service} />
    </div>)

    return <>
        <Head link='/about' title={`${menu.about} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

            <SectionBlock id='about' className="flex items-center">
                <div className='container'>
                    <div className='grid gap-6 md:grid-cols-3'>
                        <div>
                            <div className='relative md:px-8 md:pb-9'>
                                <div className="aspect-square relative">
                                    <Image fill src="/images/frontend/Nigerian-engineers.jpg" alt="Banner" className="absolute rounded-[30px] top-0 z-20 image-cover" />
                                </div>

                                <div className="absolute z-0 bottom-0 left-0 rounded-[38.0488px] bg-orange/10 shadow-lg shadow-orange/10 ratio-4by3 w-2/5" />
                                <div className="absolute z-0 top-0 right-0 rounded-[30px] bg-primary/10 shadow-lg shadow-primary/10 ratio-4by3 w-3/5" />
                            </div>
                        </div>

                        <div className='md:col-span-2'>
                            <SectionTitle head={cms.about.head} title={cms.about.title} />

                            <div className='grid gap-6 md:grid-cols-2'>
                                <div className='space-y-6'>
                                    <div>{cms.about.description}</div>

                                    <Article title={cms.about.strengths.title}>
                                        <ul>{cms.about.strengths.items.map((strength, i) => <Li key={`about-about-strength-${i}`}>{strength}</Li>)}</ul>
                                    </Article>
                                </div>

                                <div className='space-y-6'>
                                    <Article title={cms.about.goal.title}>
                                        <ul>{cms.about.goal.items.map((goal, i) => <Li key={`about-about-goal-${i}`}>{goal}</Li>)}</ul>
                                    </Article>

                                    <Article title={cms.about.follow.title}>
                                        {cms.about.follow.body}
                                    </Article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBlock>

            <SectionBlock id="services" className="before:absolute before:bg-grid-white/[0.05] before:inset-0 before:-z-10 relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-primary after:to-primary/60 after:-z-20">
                <div className="container">
                    <SectionTitle white centered head={cms.services.head} title={cms.services.title} />

                    <div className="flex flex-nowrap md:flex-wrap overflow-auto -mx-7 px-5 md:px-4 mb-6">
                        {servicesContent}
                    </div>

                    <div className='text-center'>
                        <Link href='/services'><Button color='white' icon={ArrowRightIcon}>{cms.services.view_all}</Button></Link>
                    </div>
                </div>
            </SectionBlock>

            <SectionBlock id="contact">
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

            <SectionBlock id='newsletter' className='bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10'>
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <SectionTitle centered head={cms.newsletter.head} title={cms.newsletter.title} />

                        <div className='mx-auto max-w-xl text-center mb-6 text-lg'>{cms.newsletter.description}</div>

                        {message && <Alert className='mb-4' color={message.type}>{message.content}</Alert>}

                        <form onSubmit={handleSubmit} className='grid gap-4'>
                            <Input name='firstName' onChange={onChange} value={value.firstName} required placeholder={cms.newsletter.form.first_name} />
                            <Input type='email' name='email' onChange={onChange} value={value.email} required placeholder={cms.newsletter.form.email} />

                            <div className='col-span-2 pt-5 text-center'>
                                <Button icon={ArrowRightIcon} status={status}>{cms.newsletter.form.submit}</Button>
                            </div>
                        </form>
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