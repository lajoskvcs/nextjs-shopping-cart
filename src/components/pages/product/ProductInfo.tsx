import useSWR from 'swr'
import Image from 'next/image'
import { Product } from '@/types'
function fetcher (input: RequestInfo, init?: RequestInit): any {
	return fetch(input, init).then(res => res.json())
}

type ProductInfoProps = {
	gtin: string
	productData?: Product
}

function useProductInfo(gtin: string, productData?: Product): [Product | undefined, any] {
	if(productData) {
		return [productData, false]
	}
	const { data, error } = useSWR<Product>(`/api/products/${gtin}`, fetcher);
	return [data, error]
}

function ProductInfo ({ productData, gtin }: ProductInfoProps) {
	const [data, error] = useProductInfo(gtin, productData)

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	return (
		<div>
			<Image
				src={data.imageUrl}
				alt={data.name}
				width={500}
				height={500}
			/>
			<div>{data.name}</div>
			<div>{data.categoryName}</div>
			<div>{data.brandName}</div>
			<div>{data.recommendedRetailPrice} {data.recommendedRetailPriceCurrency}</div>
		</div>
	)
}

export default ProductInfo
