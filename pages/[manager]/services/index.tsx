import { WrenchIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { ServiceInterface } from '../../../app/models/service'

import Layout from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManageServicesPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { services: { form } } } } } = content!

    const resource = 'services'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.services ? (backend.services as ServiceInterface[]) : []).map(service => {
        return updateObject(service, {
            created_at: convertDate(service.createdAt!),
            photo: <Photo photo={service.photo} see={see} title={`${form.service_photo}: ${service.title}`} />,
            action: <Action props={props} resource='services' item={service} />,
        });
    });

    const fields = [
        { name: form.title, key: 'title' },
        { name: form.body, key: 'body' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={WrenchIcon} resource={resource} />
}

ManageServicesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManageServicesPage