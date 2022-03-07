import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import { Product } from '@/types'

import Link from 'next/link'
import Layout from '@/components/Layout'
import ProductInfo from '@/pageComponents/product/ProductInfo'

import styles from './productPage.module.scss'

export async function getServerSideProps(context: NextPageContext) {
	const { query } = context
	console.log(query)
	const res = await fetch(`http://localhost:3000/api/products/${query.gtin}`)
	const data = await res.json()
	return {
		props: {
			productData: data
		}
	}
}

type ProductPageProps = {
	productData?: Product
}

function ProductPage ({ productData }: ProductPageProps) {
	const router = useRouter()
	const { query } = router
	const gtin = query.gtin!.toString()
	return (
		<Layout>
			<div className={styles.breadcrumb}>
				<div className={styles.breadcrumbLink}>
					<Link href="/">Products</Link>
				</div>
				<li>{gtin}</li>
			</div>
			<ProductInfo gtin={gtin} productData={productData} />
		</Layout>
	)
}

export default ProductPage
