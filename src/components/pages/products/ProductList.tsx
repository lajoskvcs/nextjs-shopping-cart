import { ProductsResponse } from '@/types'
import ProductCard from '@/pageComponents/products/ProductCard'

import styles from './ProductList.module.scss'

type ProductListProps = {
	data: ProductsResponse
}

export default function ProductList ({data}: ProductListProps) {
	const productRepresentations = data.results.map(product => {
		return <ProductCard key={product.gtin} data={product} />
	})

	return (
		<div className={styles.productList}>
			{productRepresentations}
		</div>
	)
}
