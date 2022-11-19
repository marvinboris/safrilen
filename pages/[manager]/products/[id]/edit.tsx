import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditProducts from '../../../../components/backend/ui/page/add-or-edit/products'

import { NextPageWithLayout } from '../../../_app'

const ManagerProductsEditPage: NextPageWithLayout = () => <ManageAddOrEditProducts edit />

ManagerProductsEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerProductsEditPage