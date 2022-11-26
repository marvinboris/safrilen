import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, ComponentProps, ReactNode, useState } from "react";

import { checkValidity, classNames } from "../../../../app/helpers/utils";
import ValidationType from "../../../../app/types/validation";

type SelectProps = ComponentProps<'select'> & {
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
    label?: ReactNode
    addon?: ReactNode
    append?: ReactNode
    validation?: ValidationType
}

export default function Select({ icon: Icon, label, addon, append, className, validation, ...props }: SelectProps) {
    const [touched, setTouched] = useState(false)

    const valid = validation ? Object.values(checkValidity(props.value as string, validation)).reduce((a, b) => a && b, true) : true

    const onChange = props.onChange ? (e: ChangeEvent<HTMLSelectElement>) => {
        setTouched(true)
        props.onChange!(e)
    } : () => { }

    return <div className={className}>
        {label && <label htmlFor={props.id ? props.id : props.name}>{label}</label>}

        <div className="h-12 rounded-[8px] bg-secondary-700/10 md:bg-secondary-100 flex items-center">
            <div>
                <div className="w-[47px] flex justify-center">
                    {Icon && <Icon className='w-[18px]' />}
                </div>
                {addon}
            </div>

            <div className='h-full flex-1 flex items-center relative'>
                <select {...props} onChange={onChange} className='h-full flex-1 border-none text-sm bg-transparent text-inherit w-full outline-none focus:ring-0' />

                {touched && validation ? <div className="absolute right-10 inset-y-0 flex items-center justify-center">
                    {valid ? <CheckIcon className='w-[18px] text-green' /> : <ExclamationCircleIcon className='w-[18px] text-red' />}
                </div> : null}
            </div>
        </div>
    </div>
}