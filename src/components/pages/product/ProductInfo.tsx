import useSWR from 'swr'
import Image from 'next/image'
import { Product } from '@/types'
import { useState } from 'react'
import { useAppContext } from '@/store'
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
	const appContext = useAppContext()
	const [data, error] = useProductInfo(gtin, productData)
	const [quantity, setQuantity] = useState(1)


	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const addToCart = () => {
		appContext.addItemToTheCart(data, quantity)
	}

	return (
		<div>
			<div className="flex justify-between mt-5 items-center">
				<div>
					<table className="table">
						<tr>
							<th>Name</th>
							<td>{data.name}</td>
						</tr>
						<tr>
							<th>Brand</th>
							<td>{data.brandName}</td>
						</tr>
						<tr>
							<th>Category</th>
							<td>{data.categoryName}</td>
						</tr>
						<tr>
							<th>Price</th>
							<td>{data.recommendedRetailPrice} {data.recommendedRetailPriceCurrency}</td>
						</tr>
					</table>
					<div className="form-control">
						<div className="input-group">
							<input type="number" placeholder="Type here"
								   className="input input-bordered input-primary w-full max-w-xs"
								   value={quantity}
								   min="1"
								   onChange={(e) => {setQuantity(parseInt(e.target.value))}}
							/>
							<button className="btn btn-secondary" onClick={() => addToCart()}>Add to cart</button>
						</div>
					</div>
				</div>
				<div className="shadow-lg rounded-2xl">
					<Image
						src={data.imageUrl}
						alt={data.name}
						width={500}
						height={500}
						className="rounded-2xl"
					/>
				</div>
			</div>
		</div>
	)
}

export default ProductInfo
