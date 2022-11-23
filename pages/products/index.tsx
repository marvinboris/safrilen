import { ReactElement } from 'react'

import { useContentContext } from '../../app/contexts/content'
import { Product } from '../../app/models'
import { ProductInterface } from '../../app/models/product'

import Layout, { Head } from '../../components/frontend/navigation/layout'
import SectionBlock from '../../components/frontend/ui/blocks/section'
import ProductBlock from '../../components/frontend/ui/blocks/product'
import PageTitle from '../../components/frontend/ui/title/page'
import SectionTitle from '../../components/frontend/ui/title/section'

import { NextPageWithLayout } from '../_app'

type ProductsType = (ProductInterface & { _id: string, link: string })[]

const ProductsPage: NextPageWithLayout<{ products: ProductsType }> = ({ products }) => {
    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { products: cms } } } } = content!

    const productsContent = products.map(product => <ProductBlock key={`product-${product._id}`} {...product} />)

    return <>
        <Head link='/products' title={`${menu.products} | ${app_name}`} description={cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={cms.subtitle} />

            <SectionBlock id="products">
                <div className="container">
                    <SectionTitle centered head={cms.products.head} title={cms.products.title} />

                    <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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

export async function getServerSideProps() {
    const products = await Product.find()

    return { props: { products: JSON.parse(JSON.stringify(products.map(product => product.toObject()))) } }
}

export default ProductsPage