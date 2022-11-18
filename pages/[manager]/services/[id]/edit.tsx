import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditServices from '../../../../components/backend/ui/page/add-or-edit/services'

import { NextPageWithLayout } from '../../../_app'

const ManagerServicesEditPage: NextPageWithLayout = () => <ManageAddOrEditServices edit />

ManagerServicesEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerServicesEditPage