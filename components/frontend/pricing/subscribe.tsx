import axios from 'axios'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { classNames } from '../../../app/helpers/utils'
import Button from '../ui/form/button'
import Input from '../ui/form/input'

const methods = [
    {
        name: 'Paiement mobile / par carte',
        description: 'OM / MoMo / VISA / MasterCard / PayPal',
        ref: 'paymooney'
    }
]

interface BouquetSubscribeProps {
    amount: number
    name: string
    id: number
}

export default function BouquetSubscribe({ amount, name, id }: BouquetSubscribeProps) {
    const { basePath, push } = useRouter()

    const [username, setUsername] = useState('')

    const [selected, setSelected] = useState(methods[0])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        // return push('/pricing/success')
        if (loading) return
        if (selected.ref === 'paymooney') {
            setLoading(true)
            const res = await axios.post<
                { response: 'success', payment_url: string } |
                { response: 'error', error_code: number, message: string }
            >('/api/payment/paymooney', { amount, name, id, username, basePath })
            setLoading(false)
            if (res.data.response === 'success') location.href = res.data.payment_url
        }
    }

    return (
        <div className="w-full px-4">
            <div className="mx-auto w-full min-h-[400px] pt-16 max-w-md space-y-[13.63px]">
                <Input name='username' onChange={e => setUsername(e.target.value)} value={username} placeholder="Nom d'utilisateur" />

                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Méthode de paiement</RadioGroup.Label>
                    <div className="space-y-2">
                        {methods.map((method) => (
                            <RadioGroup.Option
                                key={method.name}
                                value={method}
                                className={({ active, checked }) => `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary/50' : ''} ${checked ? 'bg-primary bg-opacity-75 text-white' : 'bg-white'} relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`}
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-white' : 'text-secondary-400'}`}>
                                                        {method.name}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description as="span" className={`inline ${checked ? 'text-secondary-100' : 'text-secondary-500' }`}>
                                                        <span>
                                                            {method.description}
                                                        </span>
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>

            <div className="text-center mt-auto">
                <Button onClick={handleSubmit} color='primary'>{loading ? <div className='w-5 h-5 rounded-full border-t-transparent border border-white animate-spin' /> : "Soumettre"}</Button>
            </div>
        </div>
    )
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
