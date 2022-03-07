import useSWR from 'swr'
import { ProductsResponse } from '@/types'
import ProductCard from '@/pageComponents/products/ProductCard'

import styles from './ProductList.module.scss'

function fetcher (input: RequestInfo, init?: RequestInit): any {
	return fetch(input, init).then(res => res.json())
}

export default function ProductList () {
	const { data, error } = useSWR<ProductsResponse>(`/api/products`, fetcher);

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
