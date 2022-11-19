import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { ProductInterface } from '../../../app/models/product'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerProductsPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { products: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'products' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.products)) {
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

    const data = (backend && backend.products ? (backend.products as ProductInterface[]) : []).map(product => {
        return updateObject(product, {
            created_at: convertDate(product.createdAt!),
            photo: <Photo photo={product.photo} see={see} title={`${form.product_photo}: ${product.name}`} />,
            action: <Action props={props} resource='products' item={product} />,
        });
    });

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/products`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={ShoppingBagIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={ShoppingBagIcon} props={{ ...props, backend: { status, data: backend!, message } }} isMounted={isMounted} resource='products' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.price, key: 'price' },
            { name: form.description, key: 'description' },
            { name: form.photo, key: 'photo' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerProductsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerProductsPage