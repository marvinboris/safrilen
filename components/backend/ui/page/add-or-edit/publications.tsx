import { ChatBubbleLeftEllipsisIcon, EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import { useAppSelector } from "../../../../../app/hooks"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import { selectBackend } from "../../../../../features/backend/backendSlice"

import Input from "../../form/input"
import InputImage from "../../form/input-image"
import Select from "../../form/select"
import TextArea from "../../form/text-area"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    title: '',
    description: '',
    body: '',
    photo: '',
    isActive: '1',

    add: false,
}

export default function ManageAddOrEditPublications({ edit }: Props) {
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } }, pages: { publications: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)
    const fileUpload = (id: string) => utility.add.component.fileUpload(id)

    return <ManagerAddOrEdit icon={ChatBubbleLeftEllipsisIcon} edit={edit} resource='publications' singular='publication' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={ChatBubbleLeftEllipsisIcon} onChange={inputChangeHandler} value={state.title as string} name="title" required validation={{ required: true }} label={form.title} />
                    <Select icon={EyeIcon} label={form.is_active} onChange={inputChangeHandler} value={state.isActive as string} name="isActive" required validation={{ required: true }}>
                        <option>{form.select_status}</option>
                        <option value={1}>{active}</option>
                        <option value={0}>{inactive}</option>
                    </Select>
                    <Input icon={ChatBubbleLeftEllipsisIcon} className="col-span-2" onChange={inputChangeHandler} value={state.description as string} name="description" required validation={{ required: true }} label={form.description} />
                    <TextArea className="col-span-2" onChange={inputChangeHandler} value={state.body as string} name="body" required validation={{ required: true }} label={form.body} />
                </div>
            </div>

            <div>
                <InputImage label={form.photo} name="photo" value={state.photo as string} onClick={() => fileUpload('photo')} />
            </div>
        </div>
    </ManagerAddOrEdit>
}