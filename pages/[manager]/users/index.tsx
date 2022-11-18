import { UserGroupIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { NextPageWithLayout } from '../../_app'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { UserInterface } from '../../../app/models/user'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

const ManagerUsersPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { users: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'users' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.users)) {
            dispatch(get(params))
            setIsMounted(true)
        }
    }, [backend, dispatch, params, status])

    const props = {
        auth: { role: role! },
        backend: { status, data: backend!, message },
        content: content!,
        history: router,

        get: (page?: number, show?: number | string, search?: string) => dispatch(get({ ...params, page, show, search })),
        delete: (_id: string) => dispatch(_delete({ ...params, id: _id })),
        reset: () => dispatch(reset()),
    }

    const data = (backend && backend.users ? (backend.users as UserInterface[]) : []).map(user => {
        return updateObject(user, {
            created_at: convertDate(user.createdAt!),
            photo: <Photo photo={user.photo} see={see} title={`${form.user_photo}: ${user.name}`} />,
            action: <Action props={props} resource='users' item={user} />,
        });
    });

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/users`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={UserGroupIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={UserGroupIcon} props={props} isMounted={isMounted} resource='users' data={data!} fields={[
            { name: form.full_name, key: 'name', className: 'w-100' },
            { name: form.email, key: 'email' },
            { name: form.phone, key: 'phone' },
            { name: form.role, key: 'role' },
            { name: form.photo, key: 'photo' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerUsersPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerUsersPage