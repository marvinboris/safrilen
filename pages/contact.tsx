import { ArrowRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'

import { useContentContext } from '../app/contexts/content'
import MessageType from '../app/types/message'
import Status from '../app/types/enums/status'

import Alert from '../components/frontend/ui/alert'
import SectionBlock from '../components/frontend/ui/blocks/section'
import Button from '../components/frontend/ui/form/button'
import Input from '../components/frontend/ui/form/input'
import TextArea from '../components/frontend/ui/form/text-area'
import SocialNetworks from '../components/frontend/navigation/footer/social-networks'
import Layout, { Head } from '../components/frontend/navigation/layout'
import PageTitle from '../components/frontend/ui/title/page'
import SectionTitle from '../components/frontend/ui/title/section'

import { NextPageWithLayout } from './_app'

const initialState = {
    name: '',
    email: '',
    subject: '',
    message: '',
}

const ContactPage: NextPageWithLayout = () => {
    const { content } = useContentContext()
    const { cms: { global: { app_name, contact }, frontend: { header: { menu }, pages: { contact: cms } } } } = content!

    const [status, setStatus] = useState(Status.IDLE)
    const [message, setMessage] = useState<MessageType | null>(null)
    const [value, setValue] = useState({ ...initialState })
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (status === Status.LOADING) return
        try {
            setStatus(Status.LOADING)
            const res = await axios.post<{message: MessageType}>('/api/frontend/contact', value)
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

    return <>
        <Head link='/contact' title={`${menu.contact} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

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

            <SectionBlock id='form' className='bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10'>
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <SectionTitle centered head={cms.form.head} title={cms.form.title} />

                        <div className='mx-auto max-w-xl text-center mb-6 text-lg'>{cms.form.description}</div>

                        {message && <Alert className='mb-4' color={message.type}>{message.content}</Alert>}

                        <form onSubmit={handleSubmit} className='grid md:grid-cols-2 gap-4'>
                            <Input name='name' onChange={onChange} value={value.name} required placeholder={cms.form.name} />
                            <Input type='email' name='email' onChange={onChange} value={value.email} required placeholder={cms.form.email} />
                            <Input className='md:col-span-2' name='subject' onChange={onChange} value={value.subject} required placeholder={cms.form.subject} />
                            <TextArea className='md:col-span-2' name='message' onChange={onChange} value={value.message} required placeholder={cms.form.message} />

                            <div className='col-span-2 pt-5 text-center'>
                                <Button icon={ArrowRightIcon} status={status}>{cms.form.submit}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

ContactPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ContactPage