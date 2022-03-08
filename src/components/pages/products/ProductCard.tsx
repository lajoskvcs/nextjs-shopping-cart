import Image from 'next/image'
import { Product } from '@/types'
import styles from './ProductCard.module.scss'
import { useRouter } from 'next/router'
import { useAppContext } from '@/store'
import { MouseEventHandler } from 'react'

type ProductComponentProps = {
	data: Product
}

export default function ProductCard({ data }: ProductComponentProps) {
	const router = useRouter()
	const appContext = useAppContext()
	const productPageQuery = router.query.page ? parseInt(router.query.page.toString()) : null

	const navigateToProductPage = (gtin: string) => {
		appContext.setPreviousProductPage(productPageQuery)
		router.push(`/${gtin}`)
	}

	const addToCart = () => {
		appContext.addItemToTheCart(data, 1)
	}

	return (
		<div className={`${styles.productCard}`} onClick={() => navigateToProductPage(data.gtin)}>
			<div className={styles.productCardImage}>
				<Image
					src={data.imageUrl}
					alt={data.name}
					width={400}
					height={400}
				/>
			</div>
			<div className={styles.productCardName}>{data.name}</div>
			<div className="flex justify-between items-baseline">
				<div className={styles.productCardPrice}>{ data.recommendedRetailPrice } {data.recommendedRetailPriceCurrency}</div>
				<button className="btn btn-primary" onClick={(e) => {e.stopPropagation(); addToCart()}}>Add to cart</button>
			</div>
		</div>
	)
}
