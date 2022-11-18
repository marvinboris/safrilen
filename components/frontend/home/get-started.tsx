import { ArrowRightIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react'

import Status from '../../../app/types/enums/status'

import View from '../../ui/view'
import Alert from '../ui/alert'
import Button from '../ui/form/button'
import Input from '../ui/form/input'
import CountrySelect from '../ui/form/input/country-select'
import Switch from '../ui/form/Switch'

export default function GetStarted() {
    const [page, setPage] = useState(1)
    const [message, setMessage] = useState<string | null>(null)
    const [status, setStatus] = useState(Status.IDLE)
    const [value, setValue] = useState({
        first_name: '',
        last_name: '',
        email: '',
        code: '',
        phone: '',
        terms: false,
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue({ ...value, [e.target.name]: e.target.value })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (status === Status.LOADING) return
        if (value.terms) {
            setStatus(Status.LOADING)
            try {
                const response = await axios.post<{ message?: string, status?: Status }>('/api/auth/register', value)
                const { message, status } = response.data
                if (status === Status.IDLE) setPage(2)
                else {
                    setStatus(Status.FAILED)
                    setMessage(message!)
                }
            } catch (error) {
                const { message, status } = (error as AxiosError<{ message: string, status: Status }>).response!.data
                setStatus(status)
                setMessage(message)
            }
        }
        else {
            setStatus(Status.FAILED)
            setMessage('Veuillez accepter les termes')
        }
    }

    const firstPageContent = <>
        <div className="font-bold text-primary text-lg md:text-3xl text-center md:text-left mb-[17px] md:mb-[5px]">Créez votre compte</div>

        <div className='text-sm md:text-lg text-center md:text-left mb-[30px] md:mb-[22px]'>Streamez partout !</div>

        <div className='max-h-[243px] md:max-h-[unset] px-3 md:px-0 overflow-auto mb-6 md:mb-[33px]'>
            <div className="grid md:grid-cols-2 gap-x-[17.34px] gap-y-[13.63px] mb-[22.8px]">
                {message && <Alert color='danger' className='md:col-span-2'>{message}</Alert>}
                <Input icon={UserIcon} name='first_name' placeholder='Prénom(s)' onChange={onChange} value={value.first_name} />
                <Input icon={UserIcon} name='last_name' placeholder='Nom(s)' onChange={onChange} value={value.last_name} />
                <Input icon={EnvelopeIcon} type='email' name='email' placeholder='Adresse mail' onChange={onChange} value={value.email} />
                <Input addon={<div className='w-24 pl-[15.95px]'>
                    <CountrySelect value={value.code} onChange={(code: string) => setValue({ ...value, code })} />
                </div>} type='tel' name='phone' placeholder='054 430 3333' onChange={onChange} value={value.phone} />
            </div>

            <div>
                <Switch checked={value.terms} onChange={() => setValue({ ...value, terms: !value.terms })} label={<>
                    En vous enregistrant, vous acceptez nos termes et conditions disponibles <span className='font-bold text-primary'>ici</span>.
                </>} />
            </div>
        </div>

        <div className="text-center">
            <Button type='submit'>{status === Status.LOADING ? <div className='w-8 h-8 rounded-full border border-t-transparent border-white animate-spin' /> : "Continuer"}</Button>
        </div>
    </>

    const secondPageContent = <>
        <div className="mx-auto flex flex-col flex-1 items-center justify-center">
            <div className='text-center'>
                <div className="font-bold text-primary text-lg md:text-3xl mb-[17px] md:mb-[5px]">Félicitations !</div>

                <div className='text-sm md:text-lg mb-[64.55px]'>Votre compte a été créé avec succès</div>

                <div className="space-y-5 flex flex-col items-center text-xs md:text-base">
                    <div>
                        Vous trouvez le <span className="font-bold text-primary">nom d&apos;utilisateur</span> et le <span className="font-bold text-primary">mot de passe</span> d&apos;accès à votre compte dans votre boîte mail.
                        <br /><br />
                        Veuillez télécharger l&apos;application pour profiter de vos films, séries et programmes préférés.
                    </div>

                    <div className='space-x-3 flex items-center'>
                        <a href="#"><Image width={1920} height={1920} src="/images/frontend/Available_on_the_App_Store_(black)_SVG.svg.png" alt="App store app download" className='h-10 object-contain' /></a>
                        <a href="#"><Image width={1920} height={1920} src="/images/frontend/Google_Play_Store_badge_EN.svg.png" alt="Play store app download" className='h-10 object-contain' /></a>
                    </div>
                </div>
            </div>
        </div>
    </>

    return <View action={<Button icon={ArrowRightIcon}>Commencer</Button>}>
        <Image width={1920} height={1920} src="/images/bg-get-started.svg" alt="BG Get Started" className="absolute inset-0 image-cover z-0" />

        <form onSubmit={handleSubmit} className='max-w-lg mx-auto px-5 md:px-0 min-h-[380px] flex flex-col relative z-10'>
            {page === 1 && firstPageContent}
            {page === 2 && secondPageContent}
        </form>
    </View>
}