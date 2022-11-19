import axios from 'axios'
import { ReactElement, useEffect, useState } from 'react'

import Layout, { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import ProductBlock from '../../components/frontend/ui/blocks/product'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

import { useContentContext } from '../../app/contexts/content'
import { ProductInterface } from '../../app/models/product'

import { NextPageWithLayout } from '../_app'

type ProductsType = (ProductInterface & { _id: string, link: string })[]

const ProductsPage: NextPageWithLayout = () => {
    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { products: cms } } } } = content!

    const [products, setProducts] = useState<ProductsType | null>(null)
    useEffect(() => {
        if (!products) axios.get<ProductsType>('/api/frontend/products').then(res => setProducts(res.data))
    }, [products])

    const productsContent = products && products.map(product => <ProductBlock key={`product-${product._id}`} {...product} />)

    return <>
        <Head link='/products' title={`${menu.products} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

            <SectionBlock id="products">
                <div className="container">
                    <SectionTitle centered head={cms.products.head} title={cms.products.title} />

                    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {productsContent}
                    </div>
                </div>
            </SectionBlock>
        </main>
    </>
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ProductsPage