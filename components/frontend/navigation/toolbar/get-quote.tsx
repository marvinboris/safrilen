import { BoltIcon, CalendarDaysIcon, EnvelopeIcon, MapPinIcon, UserIcon, WrenchIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useContentContext } from "../../../../app/contexts/content";

import Status from "../../../../app/types/enums/status";

import View from "../../../ui/view";
import Alert from "../../ui/alert";

import Button from "../../ui/form/button";
import Input from "../../ui/form/input";
import Select from "../../ui/form/select";
import TextArea from "../../ui/form/text-area";

export default function GetQuote() {
    const { content } = useContentContext()
    const { services, cms: { frontend: { header: { menu }, components: { quote } } } } = content!

    const [message, setMessage] = useState<string | null>(null)
    const [status, setStatus] = useState(Status.IDLE)
    const [value, setValue] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        comment: '',
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (status === Status.LOADING) return
        setStatus(Status.LOADING)
        try {
            const response = await axios.post<{ message?: string, status?: Status }>('/api/quote', value)
            const { message, status } = response.data
            setStatus(Status.FAILED)
            setMessage(message!)
        } catch (error) {
            const { message, status } = (error as AxiosError<{ message: string, status: Status }>).response!.data
            setStatus(status)
            setMessage(message)
        }

    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setValue({ ...value, [e.target.name]: e.target.value })

    return <View action={<Button size='sm'><span className='font-medium'>{menu.quote}</span><span><BoltIcon className='ml-2 inline-block w-5 text-white/60 group-hover:text-white transition-all duration-200' /></span></Button>}>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="container">
                <div className="font-bold text-primary text-lg md:text-3xl text-center md:text-left mb-[17px] md:mb-[5px]">{quote.title}</div>

                <div className='text-sm md:text-lg text-center md:text-left mb-[30px] md:mb-[22px]'>{quote.subtitle}</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[17.34px] gap-y-[13.63px] mb-[22.8px]">
                    {message && <Alert color={status === Status.FAILED ? "danger" : "success"} className='sm:col-span-2'>{message}</Alert>}

                    <Input name="first_name" icon={UserIcon} value={value.first_name} placeholder={quote.form.first_name} onChange={onChange} />
                    <Input name="last_name" icon={UserIcon} value={value.last_name} placeholder={quote.form.last_name} onChange={onChange} />
                    <Input type='email' name="email" icon={EnvelopeIcon} value={value.email} placeholder={quote.form.email} onChange={onChange} />
                    <Input addon={<div className="font-semibold text-primary sm:text-primary/20 text-base sm:text-lg">237</div>} type='tel' name='phone' onChange={onChange} value={value.phone} placeholder={quote.form.phone} />
                    <Input icon={MapPinIcon} name='address' onChange={onChange} value={value.address} placeholder={quote.form.address} className="sm:col-span-2" />
                    <Select icon={WrenchIcon} name="service_id" onChange={onChange}>
                        <option value="">{quote.form.select_service}</option>
                        {services.map(service => <option key={JSON.stringify(service)} value={service._id}>{service.title}</option>)}
                    </Select>
                    <Input type='date' icon={CalendarDaysIcon} name='date' onChange={onChange} value={value.date} placeholder={quote.form.date} />
                    <TextArea name="comment" onChange={onChange} value={value.comment} placeholder={quote.form.comment} className="sm:col-span-2" />
                </div>

                <div className="text-center">
                    <Button type='submit'>{status === Status.LOADING ? <div className='w-8 h-8 rounded-full border border-t-transparent border-white animate-spin' /> : quote.form.continue}</Button>
                </div>
            </div>
        </form>
    </View>
}