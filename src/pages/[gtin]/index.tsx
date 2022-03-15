import { useRouter } from 'next/router'
import Error from 'next/error'
import { NextPageContext } from 'next'
import { Product } from '@/types'

import Link from 'next/link'
import ProductInfo from '@/pageComponents/product/ProductInfo'

import { useAppContext } from '@/store'

export async function getServerSideProps(context: NextPageContext) {
	const { query } = context
	const res = await fetch(`http://localhost:3000/api/products/${query.gtin}`)
	if(!res.ok) {
		return {
			props: {
				errorCode: 404
			}
		}
	}
	const data = await res.json()
	return {
		props: {
			productData: data
		}
	}
}

type ProductPageProps = {
	productData?: Product
	errorCode?: number
}

function ProductPage ({ productData, errorCode }: ProductPageProps) {
	const router = useRouter()
	const appContext = useAppContext()
	const { query } = router
	const gtin = query.gtin!.toString()
	const productHref = (appContext.previousProductPage) ? `/?page=${appContext.previousProductPage}` : '/'

	if(errorCode) {
		return <Error statusCode={errorCode} />
	}

	return (
		<>
			<div className="text-sm breadcrumbs">
				<ul>
					<li><Link href={productHref}>Products</Link></li>
					<li>{gtin}</li>
				</ul>
			</div>
			<ProductInfo gtin={gtin} productData={productData} />
		</>
	)
}

export default ProductPage
