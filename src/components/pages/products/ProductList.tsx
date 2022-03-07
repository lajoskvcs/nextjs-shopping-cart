import { ProductsResponse } from '@/types'
import ProductCard from '@/pageComponents/products/ProductCard'

import styles from './ProductList.module.scss'

type ProductListProps = {
	data?: ProductsResponse
	error: any
}

export default function ProductList ({error, data}: ProductListProps) {

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const productRepresentations = data.results.map(product => {
		return <ProductCard key={product.gtin} data={product} />
	})

	return (
		<div className={styles.productList}>
			{productRepresentations}
		</div>
	)
}
