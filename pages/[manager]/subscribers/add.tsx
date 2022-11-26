import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'
import ManageAddOrEditSubscribers from '../../../components/backend/ui/page/add-or-edit/subscribers'

import { NextPageWithLayout } from '../../_app'

const ManagerSubscribersEditPage: NextPageWithLayout = () => <ManageAddOrEditSubscribers />

ManagerSubscribersEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerSubscribersEditPage