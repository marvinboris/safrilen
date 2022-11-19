import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
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

const ProductPage: NextPageWithLayout = () => {
    const router = useRouter()
    const slug = router.query.slug as string

    const { content } = useContentContext()
    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { products: cms } } } } = content!

    const [products, setProducts] = useState<ProductsType | null>(null)
    useEffect(() => {
        if (!products) axios.get<ProductsType>('/api/frontend/products').then(res => setProducts(res.data))
    }, [products])

    const product = products && products.find(product => product.slug === slug)
    const productsContent = products && products.filter(_product => product && (_product._id !== product._id)).map(product => <ProductBlock key={`product-${product._id}`} {...product} />)

    return <>
        <Head link={`/products/${slug}`} title={`${product ? `${product.name} - ` : ''}${menu.products} | ${app_name}`} description={product ? product.description : cms.description} />
        <main>
            <PageTitle title={cms.title} subtitle={product ? product.name : cms.subtitle} />

            {product && <SectionBlock id="product">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-6">
                        {product.photo && <div className='md:h-96 p-6 rounded-[30px] bg-primary/10'>
                            <Image width={1920} height={1920} src={product.photo} alt={product.name} className="object-contain w-full h-full" />
                        </div>}

                        <div>
                            <SectionTitle title={product.name} />

                            <div className='my-3'>
                                <span className='text-2xl font-bold'>{product.price}</span>{' '}<span>XAF</span>
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                    </div>
                </div>
            </SectionBlock>}

            <SectionBlock id="products" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
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

ProductPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ProductPage